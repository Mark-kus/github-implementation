import User from "./components/User.jsx"

import { Octokit } from "octokit";
const { VITE_TOKEN } = import.meta.env

export default function App() {

  const octokit = new Octokit({
    auth: VITE_TOKEN
  });

  return (
    <>
      <User octokit={octokit} /> :
    </>
  )
}