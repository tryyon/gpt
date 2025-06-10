'use client';

import { Box, Avatar, Typography } from '@mui/material';

interface AvatarCellProps {
  image?: string;
  title: string;
  subtitle?: string;
  avatarProps?: React.ComponentProps<typeof Avatar>;
}

export const AvatarCell = ({
  image,
  title,
  subtitle,
  avatarProps,
}: AvatarCellProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {image ? (
        <Avatar
          src={image}
          alt={title}
          variant="rounded"
          {...avatarProps}
        />
      ) : (
        <Avatar variant="rounded" {...avatarProps}>
          {title.charAt(0)}
        </Avatar>
      )}
      <Box>
        <Typography variant="body2" fontWeight={500}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
};