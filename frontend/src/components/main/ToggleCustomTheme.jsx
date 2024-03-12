import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';


const ToggleCustomTheme = ({ showCustomTheme, toggleCustomTheme }) => {
  return (
    <Box sx={{ maxWidth: '32px' }}>
      <Button
        variant="text"
        onClick={toggleCustomTheme}
        size="small"
        aria-label="button to toggle theme"
        sx={{ minWidth: '32px', height: '32px', p: '4px' }}
      >
        {showCustomTheme === true ? (
          <AutoFixHighIcon fontSize="small" />
        ) : (
          <AutoFixNormalIcon fontSize="small" />
        )}
      </Button>
    </Box>
  );
}

export default ToggleCustomTheme;