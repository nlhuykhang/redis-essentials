const a = { b:1, c:2 };

const {
  b,
  c,
} = a;

const d = {
  a: 3,
  ...a,
};

console.log(b, c);

console.log(d);
