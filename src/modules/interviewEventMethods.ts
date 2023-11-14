import { InterviewEvent, Prisma } from '@prisma/client';

import { ErrorWithStatus } from '../utils';
import { prisma } from '../utils/prisma';

import { CreateInterviewEvents, InterviewEventWithRelations } from './interviewEventTypes';
import { tr } from './modules.i18n';

const create = async (data: CreateInterviewEvents): Promise<InterviewEvent> => {
    const { userId, interviewId, ...restData } = data;
    const createData: Prisma.InterviewEventCreateInput = {
        ...restData,
        user: { connect: { id: userId } },
        interview: interviewId ? { connect: { id: interviewId } } : undefined,
    };

    return prisma.interviewEvent.create({ data: createData });
};

const find = async (id: number): Promise<InterviewEvent[]> => {
    const interviewHistory = await prisma.interviewEvent.findMany({
        where: { interviewId: id },
    });

    if (interviewHistory === null) {
        throw new ErrorWithStatus(tr('Interview history not found'), 404);
    }

    return interviewHistory;
};

const findWithRelations = async (id: number): Promise<InterviewEventWithRelations[]> => {
    const interviewHistory = await prisma.interviewEvent.findMany({
        where: { interviewId: id },
        include: {
            user: true,
        },
    });

    if (interviewHistory === null) {
        throw new ErrorWithStatus(tr('Interview history not found'), 404);
    }

    return interviewHistory;
};

export const interviewEvenMethods = {
    create,
    find,
    findWithRelations,
};