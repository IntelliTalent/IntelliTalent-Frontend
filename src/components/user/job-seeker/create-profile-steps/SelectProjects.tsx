import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Typography } from "@mui/material";

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function SelectProjects({
  projects,
  projectIndexes,
  setProjectIndexes,
  selectedprojectsIndexes,
  setSelectedprojectsIndexes,
}: any) {
  const [checked, setChecked] = useState<readonly number[]>([]);
  // const [left, setProjectIndexes] = useState<readonly number[]>([0, 1, 2, 3]);
  // const [right, setSelectedprojectsIndexes] = useState<readonly number[]>([4, 5, 6, 7]);

  const leftChecked = intersection(checked, projectIndexes);
  const rightChecked = intersection(checked, selectedprojectsIndexes);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setSelectedprojectsIndexes(selectedprojectsIndexes.concat(projectIndexes));
    setProjectIndexes([]);
  };

  const handleCheckedRight = () => {
    setSelectedprojectsIndexes(selectedprojectsIndexes.concat(leftChecked));
    setProjectIndexes(not(projectIndexes, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setProjectIndexes(projectIndexes.concat(rightChecked));
    setSelectedprojectsIndexes(not(selectedprojectsIndexes, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setProjectIndexes(projectIndexes.concat(selectedprojectsIndexes));
    setSelectedprojectsIndexes([]);
  };

  const customList = (items: readonly number[]) => (
    <Paper sx={{ width: 250, height: 300, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value: number) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={projects[value].name} />
              {/* <ListItemText id={labelId} primary={`List item ${value + 1}`} /> */}
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
        <Typography textAlign="center" mb={1}>
          All projects
        </Typography>
        {customList(projectIndexes)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={projectIndexes.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={selectedprojectsIndexes.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Typography textAlign="center" mb={1}>
          Selected projects
        </Typography>
        {customList(selectedprojectsIndexes)}
      </Grid>
    </Grid>
  );
}
