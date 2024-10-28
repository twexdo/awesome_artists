import AddCircleIcon from "@mui/icons-material/AddCircle";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useProject } from "../context/ProjectContext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ConfirmOptions, useConfirm } from "material-ui-confirm";
import { useTheme } from "@emotion/react";
import EditDialog from "./EditDialog";
interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  clientLink: string;
  status: "hidden" | "visible";
}

interface PortfolioItemProps {
  project: Project;
  setEditProject: any
}

const EditPopover = ({ project, setEditProject }: { project: Project, setEditProject: any }) => {
  const confirmz = useConfirm();
  const theme = useTheme()
  const { deleteProject, updateProject } = useProject()

  const handleDelete = async () => {
    confirmz({ title: "Are you 100% +1 sure? ", description: "This can't be undone!" } as ConfirmOptions)
      .then(async () => {
        handleClose()
        await deleteProject(project.id)
      })
      .catch(() => { handleClose() })
  }
  const handleDisable = async () => {
    let clonedProject = { ...project }
    clonedProject.status = clonedProject.status == "hidden" ? "visible" : "hidden"
    console.log("Stef handleDisable", { clonedProject })
    handleClose()
    await updateProject(clonedProject.id, clonedProject)
  }
  const handleEdit = () => {
    setEditProject(project.id)
    handleClose()
  }

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Tooltip title="Click to edit">
        <IconButton aria-describedby={id} onClick={handleClick}>
          <MoreHorizIcon color="secondary" />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "8em"
          }}
        >
          <Button onClick={handleEdit} fullWidth variant="text">
            Edit
            <Box ml="auto"><EditOutlinedIcon /> </Box>
          </Button>
          <Divider />
          <Button onClick={handleDisable} fullWidth variant="text">
            {project.status === 'visible' ? "Disable" : "Enable"}
            <Box ml="auto">{project.status === 'visible' ? <VisibilityOffIcon /> : <VisibilityIcon />}</Box>
          </Button>
          <Divider />
          <Button onClick={handleDelete} fullWidth variant="text">
            Delete
            <Box ml="auto"><DeleteOutlineIcon /></Box>
          </Button>
        </Box>
      </Popover>
    </>
  );
};


const ProjectCardItem: React.FC<PortfolioItemProps> = ({ project, setEditProject }) => {
  const hidden = project?.status == "hidden"
  return (
    <Card
      sx={{
        overflow: "hidden",
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: hidden ? '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)'
            : 3
        },
        background: !hidden ? "white" : "#d3d3d3",
        color: "black",
      }}
    >
      <CardContent sx={{ padding: "1em" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            noWrap
            sx={{ flexGrow: 1, fontWeight: 500, fontSize: "18px" }}
          >
            {project.title}
          </Typography>
          {/* 

          <Badge
            sx={{
              right: "1.2em",
              cursor: "pointer",
              color: (theme) => project.status === 'visible' ? theme.palette.primary.main : theme.palette.grey[300]
            }}
            badgeContent={project.status === 'visible' ? <VisibilityIcon /> : <VisibilityOffIcon />}
          /> 
          
          */}
          <EditPopover project={project} setEditProject={setEditProject} />
        </div>
        <CardMedia
          component="img"
          src={project.imageUrl || "/api/placeholder/400/300"}
          alt={project.title}
          sx={{
            width: "90%",
            height: "100%",
            margin: "1em auto",
            objectPosition: "center",
            objectFit: "cover",
            transition: "transform 0.3s",
            "&:hover": { transform: hidden ? "" : "scale(1.05)" },
          }}
        />

        <Typography
          sx={{ color: "black" }}
          variant="body2"
          color="textSecondary"
          noWrap
        >
          {project.description}
        </Typography>

        <a
          href={project.clientLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            color: "#FF6D00",
            textDecoration: "none",
            marginTop: "8px",
          }}
        >
          <OpenInNewIcon style={{ marginRight: "4px" }} />
          Visit Project
        </a>
      </CardContent>
    </Card>
  );
};
let renders = 0
const ProjectsList = () => {
  const { projects } = useProject();
  const [editProject, setEditProject] = useState<Boolean | number>(false)

  const editedProject = useMemo(() => { return projects?.find(x => x.id === editProject) }, [editProject])
  if (!projects?.length) {
    return (
      <Box
        sx={{
          height: "calc(100svh - 96px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <Container maxWidth="md">
          <Paper
            sx={{
              border: "2px dashed",
              borderColor: "divider",
              borderRadius: 2,
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "action.hover",
              transition: "background-color 0.2s",
              "&:hover": {
                backgroundColor: "action.selected",
              },
            }}
          >
            <Typography
              color="primary"
              variant="h3"
              component="h1"
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              Welcome to your portfolio
            </Typography>
            <Typography color="secondary" variant="h6">
              Start by adding your first project,for that, press spooky button
              in bottom right.
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "calc(100svh - 96px)",
        overflowY: "auto",
        padding: 2,
      }}
    >
      {!!editedProject && <EditDialog project={editedProject} open={!!editProject} setOpen={setEditProject as any} />}
      <Container>
        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} lg={4} key={project.id}>
              <ProjectCardItem project={project} setEditProject={setEditProject as any} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProjectsList;
