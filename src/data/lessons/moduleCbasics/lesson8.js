const lesson = {
  id: 'mcb-l8',
  title: 'File I/O in C',
  module: 'C Basics for Embedded',
  lessonNumber: 8,
  type: 'theory',
  xpReward: 10,
  content: `## File I/O in C

File I/O in C uses the \`FILE *\` type from \`<stdio.h>\`. On embedded Linux systems (Raspberry Pi, BeagleBone) or when logging to SD cards, this is essential.

---

### Opening and Closing Files

\`\`\`c
FILE *fp = fopen("sensor_log.txt", "w");  // open for writing
if (fp == NULL) {
    perror("Failed to open file");
    return -1;
}

// ... write data ...

fclose(fp);   // always close!
\`\`\`

#### File Modes

| Mode | Meaning |
|---|---|
| \`"r"\` | Read — file must exist |
| \`"w"\` | Write — creates/truncates |
| \`"a"\` | Append — creates if needed |
| \`"r+"\` | Read + write |
| \`"rb"\` / \`"wb"\` | Binary mode |

---

### Writing to a File

\`\`\`c
FILE *fp = fopen("log.txt", "a");

fprintf(fp, "TEMP: %.2f C\\n", 36.7f);
fprintf(fp, "PRESS: %d Pa\\n", 101325);

fclose(fp);
\`\`\`

\`fprintf\` works exactly like \`printf\` but writes to a file.

---

### Reading from a File

\`\`\`c
FILE *fp = fopen("config.txt", "r");
char line[128];

while (fgets(line, sizeof(line), fp) != NULL) {
    printf("Read: %s", line);   // line includes the newline
}

fclose(fp);
\`\`\`

#### Reading Values

\`\`\`c
int baud_rate;
fscanf(fp, "BAUD=%d", &baud_rate);
\`\`\`

---

### Binary File I/O

For logging raw sensor data efficiently (no text conversion overhead):

\`\`\`c
typedef struct {
    uint32_t timestamp;
    float    temperature;
    float    pressure;
} SensorRecord;

SensorRecord rec = { 1000, 36.7f, 101.3f };

FILE *fp = fopen("data.bin", "wb");
fwrite(&rec, sizeof(SensorRecord), 1, fp);
fclose(fp);

// Reading back
SensorRecord rec2;
FILE *fp2 = fopen("data.bin", "rb");
fread(&rec2, sizeof(SensorRecord), 1, fp2);
fclose(fp2);
\`\`\`

---

### Error Handling

\`\`\`c
if (fp == NULL) {
    perror("fopen");     // prints system error message
    return -1;
}

if (ferror(fp)) {        // check if error occurred on stream
    // handle error
}
\`\`\`

---

### File Positioning

\`\`\`c
fseek(fp, 0, SEEK_SET);    // go to beginning
fseek(fp, 0, SEEK_END);    // go to end
long pos = ftell(fp);      // get current position (file size at end)
rewind(fp);                // shorthand for fseek(fp, 0, SEEK_SET)
\`\`\`

---

### Key Takeaway

File I/O in C follows open → read/write → close. Always check for NULL after fopen, always fclose. For embedded data logging, binary fwrite/fread is faster and more compact than text-based fprintf.
`,
  hints: [
    'Always check `if (fp == NULL)` after fopen — the file may not exist or the path may be wrong.',
    'Use `"a"` mode for log files so each run appends rather than overwrites previous data.',
    'Binary fwrite/fread is faster than fprintf/fscanf for structured data — no text parsing overhead, smaller files.',
  ],
  complexity: null,
  tags: ['embedded-c', 'c-basics', 'file-io', 'fopen', 'fwrite', 'fprintf', 'logging'],
};

export default lesson;
