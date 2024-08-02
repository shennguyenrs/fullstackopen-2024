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

export default Course;
