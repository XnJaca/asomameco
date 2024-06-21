import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";

export const MainCard = ({
  border = false,
  boxShadow = false,
  children,
  content = true,
  contentClass = "",
  variantTitle = "h1",
  contentSX = {},
  darkTitle = false,
  secondary = null,
  divider = true,
  shadow = "",
  sx = {},
  title = "",
  titleJSX = null,
  headerSX = {},
  subTitle = "",
  ...others
}) => {
  const theme = useTheme();
  return (
    <Card
      {...others}
      sx={{
        border: border ? "1px solid" : "none",
        borderColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.default
            : theme.palette.grey[300] + 98,
        borderRadius: 5,
        ...sx,
      }}
    >
      {!darkTitle && (title || titleJSX) && (
        <CardHeader
          sx={headerSX}
          title={
            titleJSX ?? <Typography variant={variantTitle}>{title}</Typography>
          }
          subheader={<Typography variant="subtitle2">{subTitle}</Typography>}
          action={secondary}
        />
      )}
      {darkTitle && (title || titleJSX) && (
        <CardHeader
          sx={headerSX}
          title={
            titleJSX ?? <Typography variant={variantTitle}>{title}</Typography>
          }
          subheader={<Typography variant="subtitle1">{subTitle}</Typography>}
          action={secondary}
        />
      )}

      {title && divider ? <Divider /> : ""}

      {content && (
        <CardContent sx={contentSX} className={contentClass}>
          {children}
        </CardContent>
      )}
      {!content && children}
    </Card>
  );
};
