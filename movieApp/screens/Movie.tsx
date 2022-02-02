import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Dimensions, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { MovieResponse, moviesApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";
import HMedia from "../components/HMedia";
import Slide from "../components/Slide";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
  margin-left: 30px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const HSeparator = styled.View`
  width: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const { isLoading: upComingDataLoading, data: upComingData } =
    useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
  const { isLoading: trendingDataLoading, data: trendingData } =
    useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);

  const loading =
    nowPlayingLoading || upComingDataLoading || trendingDataLoading;
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  return loading ? (
    <Loader />
  ) : upComingData ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          {trendingData ? (
            <HList title="Trending Movies" data={trendingData.results} />
          ) : null}
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upComingData.results}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeparator}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path || ""}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  ) : null;
};
export default Movies;
