import Mutex from "./Mutex";

function wait(time: number) {
  return new Promise(resolve => window.setTimeout(resolve, time));
}

it("executes tasks in a sequence", done => {
  const mutex = new Mutex();

  const task1 = jest.fn(async () => {
    await wait(40);
    expect(task2).not.toBeCalled();
    expect(task3).not.toBeCalled();
  });
  const task2 = jest.fn(async () => {
    await wait(20);
    expect(task1).toBeCalled();
    expect(task3).not.toBeCalled();
  });
  const task3 = jest.fn(async () => {
    await wait(0);
    expect(task1).toBeCalled();
    expect(task2).toBeCalled();
    done();
  });

  mutex.run(task1);
  mutex.run(task2);
  mutex.run(task3);
});

it("preserves return value", async done => {
  const mutex = new Mutex();

  const expectedResult = "result";
  const task = jest.fn(async () => {
    await wait(0);
    return expectedResult;
  });

  const result = await mutex.run(task);
  expect(result).toBe(expectedResult);

  done();
});

it("does not stop after catching error", async done => {
  const mutex = new Mutex();

  async function run(task: () => Promise<any>) {
    try {
      await mutex.run(task);
    } catch (error) {}
  }

  const task1 = jest.fn(async () => {
    throw new Error("error");
  });
  const task2 = jest.fn(async () => {
    done();
  });

  run(task1);
  run(task2);
});
