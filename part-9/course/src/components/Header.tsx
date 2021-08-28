import React from "react";


interface HeaderProps {
  content: string
}

const Header = ({ content }: HeaderProps): JSX.Element => {
  return <h1>{content}</h1>;
}

export default Header;
