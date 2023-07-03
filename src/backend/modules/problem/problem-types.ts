import { InterviewStatus, Problem, ProblemDifficulty, SectionType, Tag, User } from '@prisma/client';
import { z } from 'zod';

import { ExtractPrismaTypeFromArray } from '../../types';

import { problemDbService } from './problem-db-service';

export const createProblemSchema = z.object({
    name: z.string().min(3),
    description: z.string(),
    solution: z.string(),
    difficulty: z.nativeEnum(ProblemDifficulty),
    tagIds: z.number().array(),
});
export type CreateProblem = z.infer<typeof createProblemSchema>;

export const updateProblemSchema = createProblemSchema.partial().extend({ problemId: z.number() });
export type UpdateProblem = z.infer<typeof updateProblemSchema>;

export const getProblemByIdSchema = z.object({
    problemId: z.number(),
});
export type GetProblemById = z.infer<typeof getProblemByIdSchema>;

export const deleteProblemSchema = z.object({
    problemId: z.number(),
});
export type DeleteProblem = z.infer<typeof deleteProblemSchema>;

export const getProblemListSchema = z
    .object({
        search: z.string(),
        tagIds: z.number().array(),
        difficulty: z.nativeEnum(ProblemDifficulty),
        favoritesOnly: z.boolean(),
        nonFavoritesOnly: z.boolean(),
        excludeInterviewId: z.number(),
        authorId: z.number(),
        sectionId: z.number(),
        excludeProblemIds: z.number().array(),
        offset: z.number(),
        limit: z.number(),
        cursor: z.number().nullish(),
        orderBy: z.string(),
        orderDirection: z.enum(['asc', 'desc']),
        statuses: z.nativeEnum(InterviewStatus).array(),
        hireStreamIds: z.number().array(),
    })
    .partial();
export type GetProblemList = z.infer<typeof getProblemListSchema>;

export type ProblemFindManyWithAuthorAndTagsAndFavourite = Problem & { author: User; tags: Tag[]; favoritedBy: User[] };

type UsedProblemMapValue = { sectionId: number; sectionType: SectionType };

export type UsedProblemMap = Map<number, UsedProblemMapValue>;

export type CheckIsAvailableProblemType = {
    isUsed?: boolean;
    problemSection?: { sectionId: number; sectionType: SectionType };
};

export type ProblemWithRelationsAndProblemSection = ProblemFindManyWithAuthorAndTagsAndFavourite &
    CheckIsAvailableProblemType;

export type ProblemWithRelations = ExtractPrismaTypeFromArray<typeof problemDbService.getList>;