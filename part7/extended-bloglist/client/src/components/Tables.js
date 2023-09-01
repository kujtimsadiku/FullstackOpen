export const Table = (table) => <table>{table.children}</table>;

export const TableData = (data) => <td>{data.children}</td>;

export const TableRow = (props) => <tr>{props.children}</tr>;

export const TableBody = (body) => <tbody>{body.children}</tbody>;

export const TableHead = (head) => <thead>{head.children}</thead>;

export const TableContainer = ({ children }) => (
  <div className="table-container">{children}</div>
);
