export default function generatorFunc(generator) {
  const args = [...arguments].slice(1);
  const gen = generator.apply(this, args);
  return new Promise((resolve, reject) => {
    const handleNext = function (_yield) {
      let next;
      try {
        next = gen.next(_yield);
      } catch (error) {
        reject(error);
      }

      if (next.done) {
        resolve(next.value);
      } else {
        return Promise.resolve(next, value).then(
          (_yield) => handleNext(_yield),
          (error) => gen.throw(error)
        );
      }
    };

    handleNext();
  });
}
