function counter(init = 0) {
  console.log("Out fn");
  let cnt = init;
  function innerFn() {
    cnt++;
    console.log("Inn fn", cnt);
  }
  return innerFn;
}
const f1 = counter(1);
f1();
const f2 = counter();
f2();
