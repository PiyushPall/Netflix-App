import useFetch from "../hooks/UseFetch";
import MovieRow from "./MovieRow";

const MovieRowApi = ({ title, endpoint }) => {
 const { data, loading } = useFetch(endpoint);

  if (loading) {
    return null;
  }

  return <MovieRow title={title} movies={data} />;

};

export default MovieRowApi;