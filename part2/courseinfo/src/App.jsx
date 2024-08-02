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

const Total = (props) => {
  const sum = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  return <p>Number of exercises {sum}</p>;
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
