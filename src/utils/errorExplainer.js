const PATTERNS = [
  {
    re: /error: '(.+?)' was not declared in this scope/,
    msg: m => `'${m[1]}' hasn't been declared. Check for typos, missing #include, or declare it before this line.`,
  },
  {
    re: /error: expected ';' before/,
    msg: () => `Missing semicolon. Add a ; at the end of the statement on the previous line.`,
  },
  {
    re: /error: expected '\)' before/,
    msg: () => `Unmatched parenthesis. Make sure every ( has a closing ).`,
  },
  {
    re: /error: expected '\}' before/,
    msg: () => `Missing closing brace. Make sure every { has a matching }.`,
  },
  {
    re: /error: no match for 'operator(.+?)'/,
    msg: m => `Operator '${m[1]}' doesn't work between these types. Check both sides are compatible types.`,
  },
  {
    re: /error: '(.+?)' is not a member of 'std'/,
    msg: m => `std::${m[1]} not found. Add the correct #include (e.g. #include <vector>, #include <string>, #include <map>).`,
  },
  {
    re: /error: redefinition of '(.+?)'/,
    msg: m => `'${m[1]}' is defined more than once. Remove the duplicate declaration.`,
  },
  {
    re: /error: undefined reference to '(.+?)'/,
    msg: m => `Linker error — '${m[1]}' is declared but never defined. Add the function body.`,
  },
  {
    re: /error: return-statement with a value.*returning 'void'/,
    msg: () => `A void function can't return a value. Either remove the return value or change the return type.`,
  },
  {
    re: /error: invalid conversion from '(.+?)' to '(.+?)'/,
    msg: m => `Can't implicitly convert ${m[1]} to ${m[2]}. Use an explicit cast: static_cast<${m[2]}>(value).`,
  },
  {
    re: /error: cannot convert '(.+?)' to '(.+?)'/,
    msg: m => `Type mismatch: ${m[1]} can't be converted to ${m[2]} automatically.`,
  },
  {
    re: /error: too many arguments to function/,
    msg: () => `Too many arguments. You're passing more values than the function expects.`,
  },
  {
    re: /error: too few arguments to function/,
    msg: () => `Too few arguments. The function expects more values than you're passing.`,
  },
  {
    re: /error: array subscript is not an integer/,
    msg: () => `Array index must be an integer. You're using a non-integer as an index.`,
  },
  {
    re: /error: 'cout'.*not declared|'cin'.*not declared|'endl'.*not declared/,
    msg: () => `Add #include <iostream> at the top of your file.`,
  },
  {
    re: /error: 'vector'.*not declared|'string'.*not declared/,
    msg: () => `Missing #include. Add #include <vector> or #include <string> as needed.`,
  },
  {
    re: /error: control reaches end of non-void function/,
    msg: () => `Not all code paths return a value. Add a return statement at the end of your function.`,
  },
  {
    re: /error: 'main' must return 'int'/,
    msg: () => `Change your main function signature to: int main()`,
  },
  {
    re: /error: jump to case label/,
    msg: () => `You can't declare variables directly in a switch-case. Wrap the case body in { } braces.`,
  },
  {
    re: /error: (\w+) does not name a type/,
    msg: m => `'${m[1]}' is not a recognized type. Check spelling or add the required #include.`,
  },
];

export function explainError(errorText) {
  if (!errorText) return null;
  const lines = errorText.split('\n');
  for (const line of lines) {
    for (const { re, msg } of PATTERNS) {
      const match = line.match(re);
      if (match) return msg(match);
    }
  }
  return null;
}
