import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Chip,
  Button,
  CircularProgress,
  Stack,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import { getMovieDetailsWithCredits } from "../api/tmdb";

const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetailsWithCredits(id!);
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!movie) return <Typography>Movie not found.</Typography>;

  return (
    <Box
      sx={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#fff",
        py: 6,
        px: 2,
        backdropFilter: "blur(3px)",
      }}
    >
      <Container maxWidth="md" sx={{ background: "rgba(0,0,0,0.7)", p: 4, borderRadius: 4 }}>
        <Typography variant="h3" gutterBottom>
          {movie.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {movie.release_date} | Rating: {movie.vote_average}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 2 }}>
          {movie.genres?.map((genre: any) => (
            <Chip key={genre.id} label={genre.name} color="primary" />
          ))}
        </Stack>

        <Typography variant="body1" mb={3}>
          {movie.overview}
        </Typography>

        {movie.videos?.results?.[0]?.key && (
          <Button
            variant="contained"
            color="error"
            href={`https://www.youtube.com/watch?v=${movie.videos.results[0].key}`}
            target="_blank"
            sx={{ mb: 3 }}
          >
            🎬 Watch Trailer
          </Button>
        )}

        <Typography variant="h5" gutterBottom>
          Cast
        </Typography>
        <Box sx={{ display: "flex", overflowX: "auto", gap: 2, py: 2 }}>
          {movie.credits?.cast?.slice(0, 10).map((actor: any) => (
            <Card
              key={actor.cast_id}
              sx={{ minWidth: 120, background: "#1c1c1c", color: "#fff" }}
            >
              <Avatar
                alt={actor.name}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : ""
                }
                sx={{ width: 80, height: 80, mx: "auto", mt: 2 }}
              />
              <CardContent>
                <Typography align="center" variant="subtitle2">
                  {actor.name}
                </Typography>
                <Typography align="center" variant="caption" color="gray">
                  as {actor.character}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default MovieDetails;