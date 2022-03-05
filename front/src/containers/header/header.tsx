import React from "react";
import { useSelector } from "react-redux";
import { HeaderSignedOut, HeaderSignedIn } from "../../components";
import { SelectIsSignedIn } from "../../store";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
  const isSignedIn = useSelector(SelectIsSignedIn);
  return <> {isSignedIn ? <HeaderSignedIn /> : <HeaderSignedOut />} </>;
};

export { Header };
