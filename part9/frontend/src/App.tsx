interface CoursePartBasic {
  name: string;
  exerciseCount: number;
  description: string;
  kind: "basic";
}

interface CoursePartGroup {
  name: string;
  exerciseCount: number;
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground {
  name: string;
  exerciseCount: number;
  description: string;
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
  ];

  const totalExcercises = coursePart.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  const Header = ({ header }: { header: string }) => {
    return <h1>{header}</h1>;
  };

  const Content = ({ course }: { course: CoursePart[] }) => {
    return course.map((course) => (
      <p key={course.name}>
        {course.name} {course.exerciseCount}
      </p>
    ));
  };

  const Total = ({ total }: { total: number }) => {
    return <p>Number of exercises {total}</p>;
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
