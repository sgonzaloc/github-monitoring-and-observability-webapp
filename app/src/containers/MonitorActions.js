import * as React from "react"
import {useCallback} from "react"
import Grid from '@mui/material/Grid';
import CustomSelect from "../components/CustomSelect";
import Alert from '@mui/material/Alert';
import AlertIcon from '@mui/icons-material/Feedback';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {useDispatch, useSelector} from 'react-redux';
import {getRepoDownloads, getRepoStargazers, setSelectedRepo,} from '../reducers/repos/reposReducer'
import {
    getOrganizationDownloads,
    getOrganizationStargazers,
    setSelectedOrganization,
} from '../reducers/organizations/organizationsReducer'
import {getReposByOrganization, getSelectedOrganization} from "../reducers/organizations/organizationsSelectors";
import {getSelectedRepo} from "../reducers/repos/reposSelectors";
import {Button} from "@mui/material";


const MonitorActions = ({organizationErrorMessage,}) => {
    const [organizationSearch, setOrganizationSearch] = React.useState();
    const [level, setLevel] = React.useState('organization');

    const dispatch = useDispatch();
    const selectedOrganization = useSelector(getSelectedOrganization);
    const selectedRepo = useSelector(getSelectedRepo);
    const reposByOrganization = useSelector(getReposByOrganization);
    const repos = reposByOrganization[selectedOrganization] || []

    const handleGetRepoDownloads = useCallback(() => dispatch(getRepoDownloads()), [dispatch]);
    const handleGetOrganizationDownloads = useCallback(() => dispatch(getOrganizationDownloads()), [dispatch]);
    const handleGetRepoStargazers = useCallback(() => dispatch(getRepoStargazers()), [dispatch]);
    const handleGetOrganizationStargazers = useCallback(() => dispatch(getOrganizationStargazers()), [dispatch]);
    const handleSetOrganization = useCallback((organization) => dispatch(setSelectedOrganization(organization)), [dispatch]);
    const handleSetSelectedRepo = useCallback((repo) => dispatch(setSelectedRepo(repo)), [dispatch]);


    const handleOnChange = (e) => {
        setOrganizationSearch(e.target.value)
    }
    const handleOnKeyDown = (e) => {
        if (e.keyCode === 13) { //enter keyCode
            handleSetOrganization(organizationSearch)
        }
    }
    const handleOnClick = e => handleSetOrganization(organizationSearch)


    return <Grid container spacing={4} sx={{display: "table-row"}} container item justifyContent="flex-start">
        <Grid container item justifyContent="flex-start" sx={{textAlign: "start"}}>
            <Grid item sm={12} md={12}>
                <Typography variant="h5">Add organization to repository</Typography>
            </Grid>
        </Grid>
        <Grid sx={{display: "table-row"}} container item spacing={4} justifyContent="flex-start">
            <Grid item sm={4} md={4} sx={{display: "table-cell", alignItems: "center", verticalAlign: "top"}}>
                <TextField
                    label="Search for a Github Organization"
                    id="outlined-start-adornment"
                    InputLabelProps={{shrink: true}}
                    sx={{m: 1, width: "25ch", minWidth: 300, marginRight: "2em"}}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleOnClick}
                                    edge="end"
                                    sx={{
                                        padding: "8px",
                                        backgroundColor: (theme) => theme.palette.grey['300']
                                    }}
                                >
                                    {<SearchIcon/>}
                                </IconButton>
                            </InputAdornment>
                    }}
                />
            </Grid>
            <Grid item sm={3} md={3}
                  sx={{display: "table-cell", margin: "8px", verticalAlign: "top", textAlign: "left"}}>
                <FormControl
                    disabled={!selectedOrganization}>
                    <FormLabel id="radio-buttons-level-label">Level</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="radio-buttons-level-label"
                        defaultValue="organization"
                        name="radio-buttons-level"
                        onChange={(e) => {
                            setLevel(e.target.value)
                            handleSetSelectedRepo({})
                        }}
                    >
                        <FormControlLabel value="organization" control={<Radio/>} label="Organization"/>
                        <FormControlLabel value="repo" control={<Radio/>} label="Repository"/>
                    </RadioGroup>
                </FormControl>
            </Grid>
            {selectedOrganization && level === 'repo' &&
                <>
                    {organizationErrorMessage ?
                        <Grid item sm={3} md={3}
                              sx={{display: "table-cell", margin: "8px", verticalAlign: "top"}}>
                            <Alert icon={<AlertIcon fontSize="inherit"/>} severity="error">
                                {organizationErrorMessage}
                            </Alert>
                        </Grid>
                        :
                        <Grid item sm={3} md={3} sx={{verticalAlign: "top"}}>
                            <CustomSelect
                                data={repos.map(elem => ({value: elem.name, name: elem.name}))}
                                label="Repository"
                                onChange={(repoName) => {
                                    const repo = repos.find(e => e.name === repoName)
                                    handleSetSelectedRepo(repo)
                                }}
                            />
                        </Grid>

                    }
                </>
            }
            <Grid item sm={2} md={2}
                  sx={{display: "table-cell", margin: "8px", verticalAlign: "middle", textAlign: "right"}}>
                <Button
                    onClick={() => {
                        if (level === 'organization') {
                            handleGetOrganizationDownloads()
                            handleGetOrganizationStargazers()
                        } else {
                            handleGetRepoDownloads()
                            handleGetRepoStargazers()
                        }
                    }}
                    variant="contained"
                    color="primary"
                    disabled={!selectedOrganization || (level === 'repo' && !selectedRepo.name)}
                >
                    Add
                </Button>
            </Grid>
        </Grid>
    </Grid>
}

export default MonitorActions