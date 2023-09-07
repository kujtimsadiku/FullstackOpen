export const Header = ({ tag, text, className }) => {
  const Htag = tag;

  return <Htag className={className ? className : null}>{text}</Htag>;
};
