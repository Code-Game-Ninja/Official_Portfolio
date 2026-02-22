import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const Terminal = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`w-full overflow-hidden rounded-xl border border-paper/20 bg-charcoal shadow-2xl ${className || ''}`}>
            {/* Terminal Header */}
            <div className="flex items-center gap-2 border-b border-paper/10 bg-paper/5 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                <div className="ml-4 font-mono text-[10px] text-paper/30 flex-1 text-center pr-8">bash - chirag_mishra</div>
            </div>
            {/* Terminal Content */}
            <div className="flex flex-col gap-2 p-4 md:p-6 font-mono text-xs md:text-sm text-paper min-h-[40vh]">
                {children}
            </div>
        </div>
    );
};

// Auto-typing animation for purely visual commands
export const TypingAnimation = ({ children, delay = 0, className }: { children: string, delay?: number, className?: string }) => {
    const [displayText, setDisplayText] = useState('');
    const text = children;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const [isTyping, setIsTyping] = useState(false);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!isInView) return;

        let timeout: ReturnType<typeof setTimeout>;
        let charIndex = 0;

        const type = () => {
            setIsTyping(true);
            if (charIndex < text.length) {
                setDisplayText(text.slice(0, charIndex + 1));
                charIndex++;
                timeout = setTimeout(type, 15 + Math.random() * 20); // very fast typing speed
            } else {
                setIsTyping(false);
            }
        };

        const initialTimeout = setTimeout(() => {
            setStarted(true);
            type();
        }, delay);

        return () => {
            clearTimeout(initialTimeout);
            clearTimeout(timeout);
        };
    }, [isInView, text, delay]);

    if (!started && !isInView) {
        return <div ref={ref} className="h-5 opacity-0">.</div>; // placeholder
    }

    return (
        <div ref={ref} className={`flex items-start ${className || ''} ${!started ? 'opacity-0' : 'opacity-100'}`}>
            <span className="whitespace-pre-wrap">{displayText}</span>
            {isTyping && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="ml-1 inline-block h-[1em] w-2 bg-paper/50 align-middle"
                />
            )}
        </div>
    );
};

export const AnimatedSpan = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!isInView) return;
        const timeout = setTimeout(() => setShow(true), delay);
        return () => clearTimeout(timeout);
    }, [isInView, delay]);

    return (
        <div ref={ref} className={`transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0 h-0 hidden'} ${className || ''}`}>
            {children}
        </div>
    );
};

// --- NEW INTERACTIVE COMPONENTS ---

export interface CommandDefinition {
    command: string;     // The command string the user must type (e.g. "profile")
    output: React.ReactNode; // What renders when successful
}

export const InteractiveTerminal = ({ commands, welcomeMessage }: { commands: CommandDefinition[], welcomeMessage?: string }) => {
    const [history, setHistory] = useState<{ command: string; output: React.ReactNode | null; id: number }[]>([]);
    const [input, setInput] = useState('');

    // History for Up/Down arrows
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [counter, setCounter] = useState(0);

    // Focus input anywhere clicked inside terminal
    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    // Auto-scroll to bottom when history changes
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const nextIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(nextIndex);
                setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const nextIndex = historyIndex - 1;
                setHistoryIndex(nextIndex);
                setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
            return;
        }

        if (e.key === 'Enter') {
            const parsedCmd = input.trim().toLowerCase();

            if (input.trim() !== '') {
                setCommandHistory(prev => [...prev, input.trim()]);
            }

            setInput(''); // clear input
            setHistoryIndex(-1); // reset history pointer

            if (parsedCmd === '') {
                setHistory(prev => [...prev, { command: '', output: null, id: counter }]);
                setCounter(c => c + 1);
                return;
            }

            if (parsedCmd === 'clear') {
                setHistory([]);
                return;
            }

            if (parsedCmd === 'help') {
                const hlp = (
                    <div className="text-paper/60 mt-1 mb-4 flex flex-col gap-1">
                        <div>Available commands:</div>
                        {commands.map(c => (
                            <div key={c.command} className="pl-4 text-accent">- {c.command}</div>
                        ))}
                        <div className="pl-4 text-accent">- clear</div>
                        <div className="pl-4 text-accent">- help</div>
                    </div>
                );
                setHistory(prev => [...prev, { command: input, output: hlp, id: counter }]);
                setCounter(c => c + 1);
                return;
            }

            // Check if command exists
            const found = commands.find(c => parsedCmd.includes(c.command));

            if (found) {
                setHistory(prev => [...prev, { command: input, output: found.output, id: counter }]);
            } else {
                const err = <div className="text-red-500 mt-1 mb-4">{`bash: command not found: ${input}`}</div>;
                setHistory(prev => [...prev, { command: input, output: err, id: counter }]);
            }

            setCounter(c => c + 1);
        }
    };

    return (
        <div
            className="w-full h-full flex flex-col cursor-text outline-none relative"
            onClick={handleTerminalClick}
        >
            <div ref={containerRef} className="flex-1 w-full pb-8 pr-2">
                {welcomeMessage && (
                    <div className="text-paper/60 mb-6 whitespace-pre-wrap">{welcomeMessage}</div>
                )}

                {history.map((entry) => (
                    <div key={entry.id} className="mb-2">
                        <div className="flex gap-2 items-center text-paper">
                            <span className="text-accent">$</span>
                            <span className="break-all">{entry.command}</span>
                        </div>
                        {entry.output && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-2"
                            >
                                {entry.output}
                            </motion.div>
                        )}
                    </div>
                ))}

                {/* Current Input Line */}
                <div className="flex gap-2 items-center text-paper relative mt-2">
                    <span className="text-accent">$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        autoFocus
                        autoComplete="off"
                        spellCheck="false"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-paper font-mono w-full"
                    />
                </div>
            </div>
        </div>
    );
};
