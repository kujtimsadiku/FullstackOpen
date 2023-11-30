interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartDescripton extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescripton {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescripton {
  backgroundMaterial: string;
  kind: "background";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

function App() {
  const courseName = "Half Stack application development";
  const coursePart: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
  ];

  const totalExcercises = coursePart.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  const Header = ({ header }: { header: string }) => {
    return <h1>{header}</h1>;
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const Content = ({ course }: { course: CoursePart[] }) => {
    return course.map((part) => (
      <div key={part.name + 1}>
        <Part course={part} />
      </div>
    ));
  };

  const Total = ({ total }: { total: number }) => {
    return <p>Total number of exercises {total}</p>;
  };

  const Part = ({ course }: { course: CoursePart }) => {
    const margin = {
      margin: 0,
    };

    switch (course.kind) {
      case "basic":
        return (
          <div>
            <h4 style={{ marginBottom: 0 }}>
              {course.name} {course.exerciseCount}
            </h4>
            <p style={margin}>
              <i>{course.description}</i>
            </p>
          </div>
        );
      case "group":
        return (
          <div>
            <h4 style={{ marginBottom: 0 }}>
              {course.name} {course.exerciseCount}
            </h4>
            <p style={margin}>Project exercises {course.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <h4 style={{ marginBottom: 0 }}>
              {course.name} {course.exerciseCount}
            </h4>
            <p style={margin}>
              <i>{course.description}</i>
            </p>
            <p style={margin}>
              submit to <a href={course.backgroundMaterial}>[ here ]</a>
            </p>
          </div>
        );
      default:
        return assertNever(course);
    }
  };

  return (
    <div>
      <Header header={courseName} />
      <Content course={coursePart} />
      <Total total={totalExcercises} />
    </div>
  );
}

export default App;
