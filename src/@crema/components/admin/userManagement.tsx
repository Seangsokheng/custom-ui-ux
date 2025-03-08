import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Box,
  Chip,
  TextField,
  Grid,
  MenuItem,
  Select,
} from '@mui/material';
import { Add, Visibility, Edit, Delete, Search } from '@mui/icons-material';
import { User } from '@crema/types/models/user';
import { initialUsers } from '@crema/mockapi/fakedb/user';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    gender: 'All Gender',
    department: 'All Department',
    year: 'All Year',
    status: 'All Status',
    club: 'All Club'
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'success';
      case 'Idle': return 'warning';
      case 'Dropout': return 'error';
      default: return 'default';
    }
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filters.gender === 'All Gender' || user.gender === filters.gender) &&
    (filters.department === 'All Department' || user.department === filters.department) &&
    (filters.year === 'All Year' || user.year === filters.year) &&
    (filters.status === 'All Status' || user.status === filters.status)
  );

  return (
    <Container>
      <Box mb={3}>
        <Typography variant="h4">Manage Users</Typography>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search users..."
              InputProps={{
                startAdornment: <Search />
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          {Object.entries(filters).map(([key, value]) => (
            <Grid item xs={12} md={key === 'status' ? 2 : 1.2} key={key}>
              <Select
                fullWidth
                value={value}
                onChange={(e) => handleFilterChange(key, e.target.value as string)}
                variant="outlined"
              >
                <MenuItem value={`All ${key.charAt(0).toUpperCase() + key.slice(1)}`}>
                  All {key.charAt(0).toUpperCase() + key.slice(1)}
                </MenuItem>
                {key === 'gender' && ['M', 'F'].map(gender => (
                  <MenuItem key={gender} value={gender}>
                    {gender === 'M' ? 'Male' : 'Female'}
                  </MenuItem>
                ))}
                {key === 'department' && ['CS', 'MIS', 'CE', 'ARC', 'EPS'].map(dept => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
                {key === 'year' && ['Year 2', 'Year 4', 'EPS'].map(year => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
                {key === 'status' && ['Active', 'Idle', 'Dropout'].map(status => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          ))}
          <Grid item xs={12} md={1.2}>
            <Button 
              fullWidth
              variant="contained" 
              color="primary" 
              startIcon={<Add />}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.year}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Chip 
                    label={user.status} 
                    color={getStatusColor(user.status)} 
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" justifyContent="end" gap={1}>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      size="small"
                    >
                      <Visibility fontSize="small" />
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      size="small"
                    >
                      <Edit fontSize="small" />
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      size="small"
                    >
                      <Delete fontSize="small" />
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserManagement;