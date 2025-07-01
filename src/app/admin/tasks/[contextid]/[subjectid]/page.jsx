import Topics from "./Topics";

const TopicDetailsPage = async ({ params }) => {
  const {subjectid, contextid} = await params;
  return <Topics subjectid={subjectid} contextid={contextid} />;
}


export default TopicDetailsPage;
