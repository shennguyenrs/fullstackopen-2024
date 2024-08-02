const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return (
    <>
      <Course course={course} />
    </>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((i) => (
        <Part key={i.id} name={i.name} exercises={i.exercises} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  let sum = parts.reduce((prev, current) => prev + current.exercises, 0);

  return (
    <p>
      <strong>total of {sum} exercises</strong>
    </p>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default App;
