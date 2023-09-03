export const TableContainer = (table) => (
  <table className="container">{table.children}</table>
);

export const TableData = (data) => <td>{data.children}</td>;

export const TableRow = (props) => <tr>{props.children}</tr>;

export const TableBody = (body) => <tbody>{body.children}</tbody>;

export const TableHead = (head) => <thead>{head.children}</thead>;
