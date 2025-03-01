import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Grid, 
  Paper, 
  Avatar, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip, 
  IconButton,
  FormHelperText,
  SelectChangeEvent
} from '@mui/material';
import { 
  Save as SaveIcon, 
  Edit as EditIcon, 
  Visibility as VisibilityIcon, 
  Delete as DeleteIcon, 
  Add as AddIcon, 
  PhotoCamera as PhotoCameraIcon 
} from '@mui/icons-material';

// Types
interface UserData {
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  department: string;
  academicYear: string;
}

interface ClubMembership {
  id: number;
  name: string;
  role: string;
  joinedDate: string;
  status: 'active' | 'pending' | 'inactive';
}

const MyAccountPage: React.FC = () => {
  // State for user data
  const [userData, setUserData] = useState<UserData>({
    fullName: "Sokheng Ly",
    studentId: "S2023765",
    email: "sokheng@paragoniu.edu.kh",
    phone: "0878322519",
    department: "Computer Science",
    academicYear: "Year 3"
  });

  // State for passwords
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // Sample club memberships
  const clubMemberships: ClubMembership[] = [
    {
      id: 1,
      name: "Paragon IU Basketball Club",
      role: "Member",
      joinedDate: "12/01/2024",
      status: "active"
    },
    {
      id: 2,
      name: "Paragon IU Debate Club",
      role: "Core Team",
      joinedDate: "05/03/2023",
      status: "active"
    }
  ];

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  // Handle password changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  // Handle academic year change
  const handleYearChange = (e: SelectChangeEvent<string>) => {
    setUserData(prev => ({ ...prev, academicYear: e.target.value as string }));
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Main content area - assuming sidebar and header are already in your layout */}
      <Box>
        {/* Profile Information Section */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" fontWeight="bold">Profile Information</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<SaveIcon />}
              sx={{ borderRadius: 2 }}
            >
              Save
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar 
                  src="/api/placeholder/120/120" 
                  alt="Profile" 
                  sx={{ width: 120, height: 120 }}
                />
                <IconButton 
                  color="primary" 
                  component="label" 
                  sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    right: 0, 
                    bgcolor: 'rgba(255,255,255,0.8)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                  }}
                >
                  <input hidden accept="image/*" type="file" />
                  <PhotoCameraIcon />
                </IconButton>
              </Box>
              {/* <Button 
                color="primary" 
                sx={{ mt: 1, textTransform: 'none' }}
              >
                Change Photo
              </Button> */}
            </Grid>
            
            <Grid item xs={12} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={userData.fullName}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Student ID"
                    name="studentId"
                    value={userData.studentId}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    value={userData.department}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="academic-year-label">Academic Year</InputLabel>
                    <Select
                      labelId="academic-year-label"
                      id="academic-year"
                      value={userData.academicYear}
                      onChange={handleYearChange}
                      label="Academic Year"
                    >
                      <MenuItem value="Year 1">Year 1</MenuItem>
                      <MenuItem value="Year 2">Year 2</MenuItem>
                      <MenuItem value="Year 3">Year 3</MenuItem>
                      <MenuItem value="Year 4">Year 4</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Change Password Section */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" fontWeight="bold">Change Password</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<SaveIcon />}
              sx={{ borderRadius: 2 }}
            >
              New Password
            </Button>
          </Box>
          
          <Grid container spacing={2} maxWidth="md">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                name="current"
                type="password"
                value={passwords.current}
                onChange={handlePasswordChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                name="new"
                type="password"
                value={passwords.new}
                onChange={handlePasswordChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Repeat New Password"
                name="confirm"
                type="password"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Paper>
        
        {/* Club Memberships Section */}
      </Box>
    </Box>
  );
};

export default MyAccountPage;