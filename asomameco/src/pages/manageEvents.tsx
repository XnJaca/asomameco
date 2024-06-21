import { Grid } from "@mui/material";
import EventList from "../features/events/eventList";

const ManageEvents = () => {
  return (
    <Grid container spacing={2} p={4}>
      <Grid item xs={12}>
        <EventList />
      </Grid>
    </Grid>
  );
};

export default ManageEvents;
