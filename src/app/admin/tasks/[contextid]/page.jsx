import Subject from "./Subjects";

const ContextDetailsPage = async ({ params }) => {
  const {contextid} = await params;
  return <Subject contextid={contextid} />;
}


export default ContextDetailsPage;
