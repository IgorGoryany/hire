import { LayoutMain } from '../../../../../components/layout/LayoutMain';
import { pageHrefs } from '../../../../../utils/paths';
import { SectionCreationForm } from '../../../../../components/sections/SectionCreationForm';
import { InferServerSideProps } from '../../../../../types';
import { accessChecks } from '../../../../../backend/access/access-checks';
import { createGetServerSideProps } from '../../../../../utils/create-get-ssr-props';
import { useSectionType, useSectionTypeInterviewers } from '../../../../../hooks/section-type-hooks';
import { QueryResolver } from '../../../../../components/QueryResolver';
import { useInterview } from '../../../../../hooks/interview-hooks';
import { useCandidate } from '../../../../../hooks/candidate-hooks';

export const getServerSideProps = createGetServerSideProps({
    requireSession: true,
    numberIds: { interviewId: true, typeId: true },
    action: async ({ ssg, session, numberIds, handleAccessChecks }) => {
        await ssg.sectionTypes.getById.fetch({ id: numberIds.typeId });
        await ssg.sectionTypes.getInterviewers.fetch({ sectionTypeId: numberIds.typeId });
        const interview = await ssg.interviews.getById.fetch({ interviewId: numberIds.interviewId });

        await handleAccessChecks(() => accessChecks.section.create(session, interview.hireStreamId));

        return { candidateId: interview.candidateId };
    },
});

export default function SectionCreationPage({
    numberIds,
    candidateId,
}: InferServerSideProps<typeof getServerSideProps>) {
    const sectionTypeQuery = useSectionType(numberIds.typeId);
    const interviewQuery = useInterview(numberIds.interviewId);
    const candidateQuery = useCandidate(candidateId);
    const interviewersQuery = useSectionTypeInterviewers(numberIds.typeId);

    return (
        <QueryResolver queries={[sectionTypeQuery, interviewQuery, candidateQuery, interviewersQuery]}>
            {([sectionType, interview, candidate, interviewers]) => (
                <LayoutMain
                    pageTitle={`#${interview.id} — ${sectionType.title}`}
                    backlink={pageHrefs.interview(interview.id)}
                >
                    <SectionCreationForm
                        interviewers={interviewers}
                        interviewId={interview.id}
                        sectionType={sectionType}
                        candidate={candidate}
                        interview={interview}
                    />
                </LayoutMain>
            )}
        </QueryResolver>
    );
}