import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle2, AlertCircle, XCircle, ChevronLeft, ChevronRight, Lightbulb, RotateCcw, Trophy, Play, Flag, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── DSA Question bank ────────────────────────────────────────────────────────
const DSA_QUESTIONS = [
  {
    id: 1, difficulty: 'Easy', company: 'Meta', mins: 10, lessonId: 'm13-l1',
    title: 'Two Sum',
    description: 'Given an array of integers and a target, return the indices of the two numbers that add up to the target. Each input has exactly one solution. You may not use the same element twice.',
    example: 'Input:  nums = [2, 7, 11, 15],  target = 9\nOutput: [0, 1]   // nums[0] + nums[1] = 2 + 7 = 9',
    hint: 'Use a hash map: for each number x, check if (target − x) already exists in the map before inserting x.',
    approach: 'Hash Map — O(n) time, O(n) space',
  },
  {
    id: 2, difficulty: 'Easy', company: 'Google', mins: 10, lessonId: 'm13-l2',
    title: 'Valid Parentheses',
    description: 'Given a string containing only (, ), {, }, [ and ], determine if it is valid. Every opening bracket must be closed by the same type of bracket in the correct order.',
    example: 'Input: "()[]{}"  →  true\nInput: "([)]"    →  false\nInput: "{[]}"    →  true',
    hint: 'Push opening brackets onto a stack. On a closing bracket, check if the top of the stack is the matching opener.',
    approach: 'Stack — O(n) time, O(n) space',
  },
  {
    id: 3, difficulty: 'Easy', company: 'Amazon', mins: 10, lessonId: 'm13-l3',
    title: 'Best Time to Buy and Sell Stock',
    description: 'Given an array where prices[i] is the stock price on day i, find the maximum profit from a single buy-then-sell transaction. If no profit is possible, return 0.',
    example: 'Input:  [7, 1, 5, 3, 6, 4]\nOutput: 5   // Buy at 1 (day 1), sell at 6 (day 4)',
    hint: 'Track the minimum price seen so far. At each step, profit = current price − min price so far.',
    approach: 'Single pass — O(n) time, O(1) space',
  },
  {
    id: 4, difficulty: 'Medium', company: 'Apple', mins: 20, lessonId: 'm13-l4',
    title: 'Product of Array Except Self',
    description: 'Given an integer array, return an array where each element is the product of all other elements. Solve in O(n) without the division operator.',
    example: 'Input:  [1, 2, 3, 4]\nOutput: [24, 12, 8, 6]',
    hint: 'First pass: build a prefix product array (left products). Second pass going right: multiply in suffix products on the fly.',
    approach: 'Prefix & Suffix Products — O(n) time, O(1) extra space',
  },
  {
    id: 5, difficulty: 'Medium', company: 'Microsoft', mins: 20, lessonId: 'm13-l5',
    title: 'Spiral Matrix',
    description: 'Given an m × n matrix, return all its elements in spiral order (right → down → left → up, repeat while shrinking boundaries).',
    example: 'Input:  [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [1,2,3,6,9,8,7,4,5]',
    hint: 'Maintain four boundary pointers (top, bottom, left, right). After each direction, shrink the corresponding boundary.',
    approach: 'Boundary simulation — O(m × n) time',
  },
  {
    id: 6, difficulty: 'Medium', company: 'Amazon', mins: 20, lessonId: 'm13-l6',
    title: 'Rotting Oranges',
    description: 'Grid cells are 0 (empty), 1 (fresh), or 2 (rotten). Each minute, rotten oranges spread to adjacent fresh ones. Return the minimum minutes until no fresh oranges remain, or −1 if impossible.',
    example: 'Input:  [[2,1,1],[1,1,0],[0,1,1]]\nOutput: 4',
    hint: 'Start BFS simultaneously from all initially rotten oranges. Track time via BFS level and count remaining fresh oranges.',
    approach: 'Multi-source BFS — O(m × n) time',
  },
  {
    id: 7, difficulty: 'Medium', company: 'Google', mins: 20, lessonId: 'm13-l7',
    title: 'Trapping Rain Water',
    description: 'Given n non-negative integers representing elevation heights, compute how much rainwater can be trapped between the bars.',
    example: 'Input:  [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6',
    hint: 'Two-pointer approach: water at any bar = min(maxLeft, maxRight) − height. Move the pointer with the smaller max inward.',
    approach: 'Two Pointers — O(n) time, O(1) space',
  },
  {
    id: 8, difficulty: 'Hard', company: 'Meta', mins: 25, lessonId: 'm13-l8',
    title: 'Merge Intervals',
    description: 'Given an array of intervals [start, end], merge all overlapping intervals and return the minimum set of non-overlapping intervals.',
    example: 'Input:  [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]',
    hint: 'Sort intervals by start time. Iterate and extend the last merged interval if the current one overlaps (curr.start ≤ last.end).',
    approach: 'Sort + Greedy — O(n log n) time',
  },
  {
    id: 9, difficulty: 'Hard', company: 'Amazon', mins: 25, lessonId: 'm13-l9',
    title: 'Coin Change',
    description: 'Given coin denominations and an amount, find the fewest number of coins needed to make that amount. Return −1 if it is not possible.',
    example: 'Input:  coins = [1, 5, 11],  amount = 15\nOutput: 3   // 5 + 5 + 5',
    hint: 'Bottom-up DP: dp[i] = min coins to make amount i. Initialize dp[0]=0 and everything else = ∞. For each amount, try all coins.',
    approach: 'Bottom-up DP — O(amount × |coins|) time',
  },
  {
    id: 10, difficulty: 'Hard', company: 'Microsoft', mins: 25, lessonId: 'm13-l10',
    title: 'Course Schedule',
    description: 'There are numCourses to take. prerequisites[i] = [a, b] means b must be taken before a. Return true if you can finish all courses (i.e., no cycle exists).',
    example: 'Input:  numCourses=2,  prerequisites=[[1,0]]\nOutput: true   // Take 0 first, then 1',
    hint: 'Build a directed graph. Use DFS with 3-state coloring — unvisited (0), in-stack (1), done (2) — to detect back edges (cycles).',
    approach: 'DFS cycle detection — O(V + E) time',
  },
];

// ─── Embedded C Question bank ─────────────────────────────────────────────────
const ECE_QUESTIONS = [
  {
    id: 'e1', difficulty: 'Easy', company: 'TI', mins: 10, lessonId: 'meciq-l1',
    title: 'The volatile Keyword',
    description: 'What does the volatile keyword do in C? Give two real embedded scenarios where omitting it causes a silent bug that is nearly impossible to debug.',
    example: 'volatile uint32_t *STATUS = (volatile uint32_t *)0x40001000;\nwhile (!(*STATUS & 0x01)) {}   // Re-reads hardware every iteration ✓\n\n// ISR-shared flag — without volatile, compiler may never re-read it:\nvolatile bool dataReady = false;\nvoid UART_IRQ(void) { dataReady = true; }\nint main(void) { while (!dataReady) {} }  // Works correctly ✓',
    hint: 'The compiler assumes variables in registers do not change unless your code writes to them. volatile disables that assumption.',
    approach: 'Use volatile for: (1) hardware registers, (2) ISR-shared variables, (3) variables in multi-threaded contexts without a proper mutex.',
  },
  {
    id: 'e2', difficulty: 'Easy', company: 'NXP', mins: 10, lessonId: 'meciq-l2',
    title: 'Bit Manipulation Macros',
    description: 'Write C macros to SET, CLEAR, TOGGLE, and CHECK a specific bit n in a register. Why must you use 1U instead of 1? What is the result of SET_BIT(0x00, 3)?',
    example: '#define SET_BIT(reg, n)   ((reg) |=  (1U << (n)))\n#define CLR_BIT(reg, n)   ((reg) &= ~(1U << (n)))\n#define TOG_BIT(reg, n)   ((reg) ^=  (1U << (n)))\n#define CHK_BIT(reg, n)   (((reg) >> (n)) & 1U)\n\nSET_BIT(0x00, 3)  →  0x08  (bit 3 set)',
    hint: 'Shifting a signed 1 left into the sign bit is undefined behavior in C. 1U is unsigned — always safe.',
    approach: 'OR to set, AND with inverted mask to clear, XOR to toggle, shift-right and mask with 1U to check.',
  },
  {
    id: 'e3', difficulty: 'Easy', company: 'Qualcomm', mins: 10, lessonId: 'meciq-l7',
    title: 'Function Pointers & Callbacks',
    description: 'Declare a typedef for a callback that takes a uint8_t pin and returns void. Show how a GPIO driver stores and fires it on interrupt. Why are function pointers essential in embedded HAL design?',
    example: 'typedef void (*GPIO_Callback)(uint8_t pin);\nstatic GPIO_Callback callbacks[16] = {NULL};\n\nvoid GPIO_Register(uint8_t pin, GPIO_Callback cb) {\n    callbacks[pin] = cb;\n}\nvoid GPIO_IRQHandler(void) {\n    uint8_t pin = GPIO_GetPending();\n    if (callbacks[pin]) callbacks[pin](pin);\n}',
    hint: 'Function pointers decouple the driver (which calls at the right time) from the application (which decides what to do).',
    approach: 'Use typedef for readability. Always check for NULL before calling. This pattern is the basis of every embedded HAL and RTOS callback.',
  },
  {
    id: 'e4', difficulty: 'Medium', company: 'STMicro', mins: 15, lessonId: 'meciq-l3',
    title: 'Memory Segments',
    description: 'A Cortex-M4 has 512 KB Flash and 128 KB SRAM. Classify each variable below into its segment and explain its RAM vs Flash impact:\n\nconst uint32_t TABLE[256];\nuint32_t txBuf[64];\nuint32_t count = 5;\nstatic uint8_t flag;',
    example: 'const uint32_t TABLE[256]  → .rodata → Flash only (saves RAM ✓)\nuint32_t txBuf[64]          → .BSS   → SRAM (zero-init, no Flash copy)\nuint32_t count = 5          → .data  → SRAM + Flash (init value in Flash)\nstatic uint8_t flag         → .BSS   → SRAM (zero-init)',
    hint: 'const variables can live in Flash. BSS is zero-initialized by startup code — only size is stored, not a Flash copy. data needs both.',
    approach: 'Minimize .data (each byte costs Flash AND RAM). Use const for lookup tables. BSS is cheapest — just RAM, startup zeroes it for free.',
  },
  {
    id: 'e5', difficulty: 'Medium', company: 'TI', mins: 15, lessonId: 'meciq-l4',
    title: 'ISR Design — 5 Golden Rules',
    description: 'List the 5 golden rules for writing an ISR. What is the "deferred processing" pattern? Why is printf() forbidden inside an ISR?',
    example: '// BAD ISR:\nvoid UART_IRQ(void) {\n    printf("rx: %d", UART->DR);  // NEVER: blocking, non-reentrant\n}\n\n// GOOD ISR (deferred processing):\nvolatile bool rxReady = false;\nvoid UART_IRQ(void) {\n    rxBuf = UART->DR;    // 1 instruction\n    rxReady = true;      // signal main loop\n    UART->SR &= ~0x01;   // clear flag\n}',
    hint: 'ISRs preempt main code at random points. Anything that can block, allocate memory, or is non-reentrant will cause hard-to-reproduce bugs.',
    approach: '5 rules: (1) Keep it short. (2) No blocking calls. (3) No malloc/free. (4) Clear the interrupt flag. (5) Use volatile for shared data.',
  },
  {
    id: 'e6', difficulty: 'Medium', company: 'Intel', mins: 15, lessonId: 'meciq-l5',
    title: 'Endianness & Byte Order',
    description: 'Explain big-endian vs little-endian. Write a runtime detection function. A sensor sends 0x03, 0xE8 MSB-first over SPI. Show the correct way to reconstruct the 16-bit value on a little-endian MCU.',
    example: 'int isLittleEndian(void) {\n    uint16_t x = 0x0001;\n    return *(uint8_t *)&x == 0x01;\n}\n\n// Safe reconstruction (do NOT cast pointer — endian bug!):\nuint8_t raw[2] = {0x03, 0xE8};\nuint16_t val = ((uint16_t)raw[0] << 8) | raw[1];  // = 1000 ✓\n// *(uint16_t*)raw  →  0xE803 on LE = 59395 (WRONG)',
    hint: 'Never reinterpret a byte array with a pointer cast on a multi-byte type — the byte order of the MCU may not match the protocol.',
    approach: 'Always reconstruct multi-byte values manually using shifts and ORs. Use htons/ntohl for network comms. ARM Cortex-M is little-endian by default.',
  },
  {
    id: 'e7', difficulty: 'Medium', company: 'NXP', mins: 15, lessonId: 'meciq-l8',
    title: 'Memory-Mapped I/O & Register Access',
    description: 'Explain memory-mapped I/O. Write code to configure GPIOA pin 5 as push-pull output and drive it HIGH using raw register access (MODER at 0x48000000, ODR at 0x48000014). Why must all register accesses be read-modify-write?',
    example: '#define GPIOA_MODER (*(volatile uint32_t *)0x48000000)\n#define GPIOA_ODR   (*(volatile uint32_t *)0x48000014)\n\n// Configure pin 5 as output (bits [11:10] = 01)\nGPIOA_MODER &= ~(3U << 10);   // clear\nGPIOA_MODER |=  (1U << 10);   // set output mode\n\nGPIOA_ODR |= (1U << 5);       // drive HIGH',
    hint: 'Direct assignment (= 0x400) resets ALL other pins. RMW only touches your bits while leaving all others unchanged.',
    approach: 'Always cast to volatile pointer. Use RMW for shared registers. In production, use CMSIS struct (GPIOA->MODER) over raw addresses.',
  },
  {
    id: 'e8', difficulty: 'Hard', company: 'STMicro', mins: 20, lessonId: 'meciq-l6',
    title: 'Struct Padding & Bit Fields',
    description: 'What is sizeof(struct A) and sizeof(struct B)? How do you eliminate padding for a hardware register frame? When are bit fields appropriate?\n\nstruct A { char a; int b; char c; };\nstruct B { int b; char a; char c; };',
    example: 'sizeof(struct A) = 12  // [a][pad×3][b b b b][c][pad×3]\nsizeof(struct B) = 8   // [b b b b][a][c][pad×2]\n\n// Packed for protocol frame:\n__attribute__((packed)) struct Frame {\n    uint8_t cmd; uint16_t len; uint32_t crc;\n}; // sizeof = 7\n\n// Bit fields for register maps:\ntypedef struct { uint32_t EN:1; uint32_t MODE:2; uint32_t :29; } CTRL;',
    hint: 'Each member aligns to its own size. Order largest-to-smallest to minimize padding. Packed structs risk alignment faults on Cortex-M0.',
    approach: 'Use packed only for comms frames. Use bit fields for hardware register maps with named fields. Never use packed for general data structures.',
  },
  {
    id: 'e9', difficulty: 'Hard', company: 'Qualcomm', mins: 20, lessonId: 'meciq-l9',
    title: 'DMA vs Interrupts vs Polling',
    description: 'Compare all three I/O strategies for receiving 4096 bytes from SPI on a battery-powered device. Which is best and why? What is double buffering in DMA context?',
    example: '// Polling: CPU stuck busy-waiting (100% CPU, max power)\nwhile (!(SPI->SR & RXNE)) {} buf[i++] = SPI->DR;\n\n// Interrupt: 4096 ISRs for 4096 bytes — high ISR overhead\nvoid SPI_IRQ(void) { buf[idx++] = SPI->DR; }\n\n// DMA: 1 interrupt at end — CPU sleeps the entire transfer\nDMA_Setup(&SPI->DR, buf, 4096);\nCPU_Sleep(); // wakes on DMA-complete IRQ',
    hint: 'DMA fires one interrupt for the entire transfer. Sleeping the CPU during DMA = maximum battery life.',
    approach: 'DMA + sleep = best for power. Double buffering: DMA fills buffer A while CPU processes buffer B, then swap — zero dead time between transfers.',
  },
  {
    id: 'e10', difficulty: 'Hard', company: 'Intel', mins: 20, lessonId: 'meciq-l10',
    title: 'RTOS: Mutex vs Semaphore & Priority Inversion',
    description: 'Distinguish mutex from binary semaphore in FreeRTOS. Describe the priority inversion problem with a concrete 3-task example. How does priority inheritance resolve it? What is a deadlock and how do you prevent it?',
    example: '// Priority Inversion:\n// T-Low (P=1) holds mutex → T-High (P=3) blocks on mutex\n// T-Med (P=2) preempts T-Low → T-High now blocked by T-Med!\n\n// Priority Inheritance fix:\n// OS raises T-Low to P=3 temporarily → runs to completion\n// → releases mutex → T-High unblocks immediately\n\n// Deadlock prevention: always acquire locks in the same global order',
    hint: 'Mutex has ownership + priority inheritance. Binary semaphore has no ownership — used for signaling. Deadlock = circular wait on two or more mutexes.',
    approach: 'Use mutex to protect shared resources. Use binary semaphore to signal between tasks or from ISR. Prevent deadlock via consistent lock ordering.',
  },
];

const DIFF_COLOR = { Easy: '#34d399', Medium: '#f59e0b', Hard: '#f87171' };
const DIFF_BG    = { Easy: 'rgba(52,211,153,0.1)', Medium: 'rgba(245,158,11,0.1)', Hard: 'rgba(248,113,113,0.1)' };
const COMPANY_COLOR = {
  Google: '#4285F4', Meta: '#0668E1', Amazon: '#FF9900', Microsoft: '#00A4EF', Apple: '#94a3b8',
  TI: '#e05252', NXP: '#f4a500', STMicro: '#03a9f4', Qualcomm: '#3253dc', Intel: '#0071c5',
};

function fmt(s) {
  const m = Math.floor(s / 60), sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

const STATUS_META = {
  solved:    { label: 'Solved',    icon: <CheckCircle2 size={13} />, color: '#34d399', bg: 'rgba(52,211,153,0.12)',   border: 'rgba(52,211,153,0.3)'   },
  attempted: { label: 'Attempted', icon: <AlertCircle  size={13} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)'   },
  stuck:     { label: 'Stuck',     icon: <XCircle      size={13} />, color: '#f87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.3)'  },
};

// ─── Start screen ─────────────────────────────────────────────────────────────
function StartScreen({ onStart, mode, onToggleMode, activeQ }) {
  const totalMins = activeQ.reduce((s, q) => s + q.mins, 0);
  const isEce = mode === 'ece';
  const accentGrad = isEce
    ? 'linear-gradient(135deg,#f59e0b,#f97316)'
    : 'linear-gradient(135deg,#4f46e5,#7c3aed)';
  const accentGlow = isEce ? 'rgba(245,158,11,0.3)' : 'rgba(99,102,241,0.3)';
  const accentBorder = isEce ? 'rgba(245,158,11,0.18)' : 'rgba(99,102,241,0.18)';
  const accentBg = isEce ? 'rgba(245,158,11,0.08)' : 'rgba(99,102,241,0.08)';
  const subtitle = isEce
    ? '10 questions — Easy to Hard — TI, NXP, Qualcomm, STMicro & Intel.'
    : '10 problems — Easy to Hard — across Google, Meta, Amazon, Microsoft & Apple.';

  return (
    <div className="w-full px-6 py-10" style={{ background: '#0a0f1c' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg w-full mx-auto text-center">

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: accentGrad, boxShadow: `0 0 40px ${accentGlow}` }}>
          {isEce ? <Cpu size={28} className="text-white" /> : <Clock size={28} className="text-white" />}
        </div>

        <h1 className="text-3xl font-black text-white mb-2">Mock Interview</h1>
        <p className="text-dark-400 text-sm mb-6">{subtitle}</p>

        {/* Track toggle */}
        <div className="flex rounded-xl p-1 mb-8"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => onToggleMode('dsa')}
            className="flex-1 py-2.5 rounded-lg text-sm font-bold transition-all"
            style={mode === 'dsa'
              ? { background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: 'white' }
              : { color: '#6b7280' }}>
            DSA Algorithms
          </button>
          <button
            onClick={() => onToggleMode('ece')}
            className="flex-1 py-2.5 rounded-lg text-sm font-bold transition-all"
            style={mode === 'ece'
              ? { background: 'linear-gradient(135deg,#f59e0b,#f97316)', color: 'white' }
              : { color: '#6b7280' }}>
            Embedded C
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[['10', 'Questions'], [`~${totalMins}`, 'Minutes'], ['3', 'Difficulty levels']].map(([v, l]) => (
            <div key={l} className="rounded-xl py-4"
              style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
              <p className="text-xl font-black text-white">{v}</p>
              <p className="text-xs text-dark-400 mt-0.5">{l}</p>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="rounded-2xl p-5 mb-8 text-left"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs font-bold text-dark-300 uppercase tracking-widest mb-3">Instructions</p>
          {[
            'Work through all 10 questions at your own pace.',
            'A timer runs at the top — try to finish within the suggested time.',
            'After each question, mark yourself: Solved / Attempted / Stuck.',
            'Hints are available — use them sparingly for a realistic experience.',
            'Your score is shown at the end based on your self-assessment.',
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-2.5 mb-2">
              <span className="font-bold text-xs shrink-0 mt-0.5"
                style={{ color: isEce ? '#f59e0b' : '#818cf8' }}>{i + 1}.</span>
              <span className="text-xs text-dark-300">{t}</span>
            </div>
          ))}
        </div>

        <button onClick={onStart}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: accentGrad, boxShadow: `0 4px 24px ${accentGlow}` }}>
          <Play size={16} /> Start Interview
        </button>
      </motion.div>
    </div>
  );
}

// ─── Results screen ───────────────────────────────────────────────────────────
function ResultsScreen({ answers, timeTaken, onRetry, navigate, questions, mode }) {
  const solved    = questions.filter(q => answers[q.id] === 'solved').length;
  const attempted = questions.filter(q => answers[q.id] === 'attempted').length;
  const stuck     = questions.filter(q => !answers[q.id] || answers[q.id] === 'stuck').length;
  const score     = solved * 10 + attempted * 5;
  const maxScore  = questions.length * 10;
  const pct       = Math.round((score / maxScore) * 100);

  const grade = pct >= 80 ? { label: 'Excellent', color: '#34d399' }
              : pct >= 60 ? { label: 'Good',       color: '#f59e0b' }
              : pct >= 40 ? { label: 'Keep going', color: '#f97316' }
              :              { label: 'Need practice', color: '#f87171' };

  return (
    <div className="w-full" style={{ background: '#0a0f1c' }}>
      <div className="max-w-2xl mx-auto px-4 py-10 pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="text-center mb-8">
            <Trophy size={40} className="mx-auto mb-3 text-yellow-400" />
            <h1 className="text-3xl font-black text-white mb-1">Interview Complete</h1>
            <p className="text-dark-400 text-sm">Time taken: {fmt(timeTaken)}</p>
          </div>

          {/* Score circle */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full flex flex-col items-center justify-center mb-3"
              style={{ background: `${grade.color}18`, border: `3px solid ${grade.color}50` }}>
              <span className="text-3xl font-black" style={{ color: grade.color }}>{pct}%</span>
              <span className="text-xs font-semibold text-dark-400">{score}/{maxScore} pts</span>
            </div>
            <span className="text-sm font-bold px-4 py-1.5 rounded-full"
              style={{ background: `${grade.color}18`, color: grade.color, border: `1px solid ${grade.color}40` }}>
              {grade.label}
            </span>
          </div>

          {/* Summary row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Solved',    value: solved,    color: '#34d399' },
              { label: 'Attempted', value: attempted, color: '#f59e0b' },
              { label: 'Stuck',     value: stuck,     color: '#f87171' },
            ].map(s => (
              <div key={s.label} className="rounded-xl py-4 text-center"
                style={{ background: `${s.color}0d`, border: `1px solid ${s.color}30` }}>
                <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-dark-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Per-question breakdown */}
          <div className="rounded-2xl overflow-hidden mb-6"
            style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <p className="text-[10px] font-bold text-dark-500 uppercase tracking-widest px-4 py-3 border-b"
              style={{ borderColor: 'rgba(255,255,255,0.05)' }}>Question breakdown</p>
            {questions.map((q, i) => {
              const status = answers[q.id] || 'stuck';
              const sm = STATUS_META[status];
              return (
                <div key={q.id}
                  className="flex items-center gap-3 px-4 py-3 border-b last:border-b-0 cursor-pointer hover:bg-white/5 transition-all"
                  style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                  onClick={() => navigate(`/lesson/${q.lessonId}`)}>
                  <span className="text-xs text-dark-600 w-4 shrink-0">{i + 1}</span>
                  <span className="flex-1 text-sm text-slate-300 truncate">{q.title}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: DIFF_BG[q.difficulty], color: DIFF_COLOR[q.difficulty] }}>{q.difficulty}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: sm.bg, color: sm.color, border: `1px solid ${sm.border}` }}>
                    {sm.icon} {sm.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={onRetry}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
              <RotateCcw size={14} /> Try Again
            </button>
            <button onClick={() => navigate(mode === 'ece' ? '/lesson/meciq-l1' : '/problems')}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
              {mode === 'ece' ? 'Review Lessons' : 'View Problem Sets'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Main interview screen ────────────────────────────────────────────────────
export default function InterviewPage() {
  const navigate = useNavigate();
  const [mode,     setMode]     = useState('dsa');
  const [phase,    setPhase]    = useState('start');
  const [qIdx,     setQIdx]     = useState(0);
  const [answers,  setAnswers]  = useState({});
  const [hints,    setHints]    = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const timerRef = useRef(null);

  const activeQ   = mode === 'ece' ? ECE_QUESTIONS : DSA_QUESTIONS;
  const totalSecs = activeQ.reduce((s, q) => s + q.mins * 60, 0);

  useEffect(() => {
    if (phase !== 'interview') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); endInterview(0); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  function startInterview() {
    setQIdx(0); setAnswers({}); setHints({});
    setTimeLeft(totalSecs); setTimeTaken(0);
    setPhase('interview');
  }

  function endInterview(left = timeLeft) {
    clearInterval(timerRef.current);
    setTimeTaken(totalSecs - left);
    setPhase('results');
  }

  function mark(status) {
    setAnswers(prev => ({ ...prev, [activeQ[qIdx].id]: status }));
    if (qIdx < activeQ.length - 1) setQIdx(qIdx + 1);
  }

  function handleToggleMode(newMode) {
    setMode(newMode);
    setAnswers({}); setHints({});
  }

  const isEce = mode === 'ece';

  if (phase === 'start')
    return <div className="h-full overflow-y-auto" style={{ background: '#0a0f1c' }}>
      <StartScreen onStart={startInterview} mode={mode} onToggleMode={handleToggleMode} activeQ={activeQ} />
    </div>;

  if (phase === 'results')
    return <div className="h-full overflow-y-auto" style={{ background: '#0a0f1c' }}>
      <ResultsScreen answers={answers} timeTaken={timeTaken} onRetry={() => setPhase('start')} navigate={navigate} questions={activeQ} mode={mode} />
    </div>;

  const q = activeQ[qIdx];
  const answered = Object.keys(answers).length;
  const timerColor = timeLeft < 600 ? '#f87171' : timeLeft < 1800 ? '#f59e0b' : '#a5b4fc';
  const accentColor = isEce ? '#f59e0b' : '#6366f1';
  const accentLight = isEce ? '#fbbf24' : '#818cf8';

  return (
    <div className="w-full flex flex-col" style={{ background: '#0a0f1c', minHeight: '100%' }}>

      {/* Top bar */}
      <div className="flex items-center gap-4 px-4 py-3 shrink-0"
        style={{ background: 'rgba(17,17,28,0.9)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <Clock size={13} style={{ color: timerColor }} />
          <span className="text-sm font-mono font-bold" style={{ color: timerColor }}>{fmt(timeLeft)}</span>
        </div>

        <div className="flex-1 h-1.5 bg-dark-700 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(qIdx / activeQ.length) * 100}%`, background: `linear-gradient(90deg,${accentColor},${accentLight})` }} />
        </div>

        <span className="text-xs text-dark-500 shrink-0">{answered}/{activeQ.length} marked</span>

        <button onClick={() => endInterview()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)', color: '#f87171' }}>
          <Flag size={11} /> Finish
        </button>
      </div>

      <div className="flex flex-1">
        {/* Left: question list */}
        <div className="hidden md:flex flex-col w-52 shrink-0 overflow-y-auto p-3 gap-1"
          style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          {activeQ.map((question, i) => {
            const status = answers[question.id];
            const sm = status ? STATUS_META[status] : null;
            const active = i === qIdx;
            return (
              <button key={question.id} onClick={() => setQIdx(i)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all"
                style={active
                  ? { background: `${accentColor}30`, border: `1px solid ${accentColor}55` }
                  : { background: 'rgba(255,255,255,0.02)', border: '1px solid transparent' }}>
                <span className="text-[10px] text-dark-600 w-3 shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate leading-tight">{question.title}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: DIFF_COLOR[question.difficulty] }}>{question.difficulty}</p>
                </div>
                {sm && <span style={{ color: sm.color }}>{sm.icon}</span>}
              </button>
            );
          })}
        </div>

        {/* Right: question detail */}
        <div className="flex-1 p-4 md:p-6 pb-10">
          <AnimatePresence mode="wait">
            <motion.div key={q.id}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}>

              {/* Question header */}
              <div className="flex items-start gap-3 mb-5 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: DIFF_BG[q.difficulty], color: DIFF_COLOR[q.difficulty] }}>{q.difficulty}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ color: COMPANY_COLOR[q.company], background: `${COMPANY_COLOR[q.company]}18`, border: `1px solid ${COMPANY_COLOR[q.company]}40` }}>
                      {q.company}
                    </span>
                    <span className="text-[10px] text-dark-500">{q.mins} min suggested</span>
                  </div>
                  <h2 className="text-xl font-black text-white">{qIdx + 1}. {q.title}</h2>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-xl p-4 mb-4"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{q.description}</p>
              </div>

              {/* Example */}
              <div className="rounded-xl p-4 mb-4"
                style={{ background: `${accentColor}0a`, border: `1px solid ${accentColor}25` }}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: accentLight }}>
                  {isEce ? 'Answer / Code' : 'Example'}
                </p>
                <pre className="text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">{q.example}</pre>
              </div>

              {/* Hint */}
              <div className="mb-6">
                {hints[q.id] ? (
                  <div className="rounded-xl p-4"
                    style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
                    <p className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest mb-1.5">Hint</p>
                    <p className="text-xs text-slate-300 leading-relaxed mb-2">{q.hint}</p>
                    <p className="text-[10px] text-dark-400"><span className="text-yellow-600 font-semibold">Approach:</span> {q.approach}</p>
                  </div>
                ) : (
                  <button onClick={() => setHints(h => ({ ...h, [q.id]: true }))}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                    style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', color: '#f59e0b' }}>
                    <Lightbulb size={14} /> Show Hint
                  </button>
                )}
              </div>

              {/* Self-mark buttons */}
              <div>
                <p className="text-[10px] font-bold text-dark-500 uppercase tracking-widest mb-3">How did it go?</p>
                <div className="flex gap-3 flex-wrap">
                  {Object.entries(STATUS_META).map(([key, sm]) => {
                    const active = answers[q.id] === key;
                    return (
                      <button key={key} onClick={() => mark(key)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                        style={active
                          ? { background: sm.bg, border: `1px solid ${sm.border}`, color: sm.color }
                          : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280' }}>
                        {sm.icon} {sm.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <button onClick={() => setQIdx(Math.max(0, qIdx - 1))} disabled={qIdx === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-25"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af' }}>
                  <ChevronLeft size={14} /> Prev
                </button>
                <span className="text-xs text-dark-500">{qIdx + 1} of {activeQ.length}</span>
                {qIdx < activeQ.length - 1 ? (
                  <button onClick={() => setQIdx(qIdx + 1)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    style={{ background: `${accentColor}30`, border: `1px solid ${accentColor}55`, color: accentLight }}>
                    Next <ChevronRight size={14} />
                  </button>
                ) : (
                  <button onClick={() => endInterview()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: 'white' }}>
                    <Flag size={14} /> Finish
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
