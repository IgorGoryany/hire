import React, { VFC } from 'react';
import { Badge } from '@taskany/bricks';

import { getTagColor } from '../../utils/tag-palette';

type BadgeProps = JSX.LibraryManagedAttributes<typeof Badge, React.ComponentProps<typeof Badge>>;

type TagChipProps = Omit<BadgeProps, 'size' | 'children' | 'label' | 'color'> & {
    tag: {
        id: number;
        name: string;
        color?: string | null;
    };
};

export const TagChip: VFC<TagChipProps> = ({ tag, className, ...restProps }) => {
    const color = tag.color ?? getTagColor(tag.id);

    return (
        <Badge size="m" color={color} {...restProps}>
            {tag.name}
        </Badge>
    );
};