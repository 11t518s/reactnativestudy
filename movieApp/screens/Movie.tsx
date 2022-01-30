import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { MovieResponse, moviesApi } from "../api";
import HMedia from "../components/HMedia";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const VSeparator = styled.View`
  width: 20px;
`;
const HSeparator = styled.View`
  width: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upComingDataLoading,
    data: upComingData,
    isRefetching: isRefetchingUpComingData,
  } = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
  const {
    isLoading: trendingDataLoading,
    data: trendingData,
    isRefetching: isRefetchingTrendingData,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);
  const onRefresh = async () => {
    queryClient.refetchQueries(["movies"]);
  };

  const loading =
    nowPlayingLoading || upComingDataLoading || trendingDataLoading;
  const refreshing =
    isRefetchingTrendingData ||
    isRefetchingNowPlaying ||
    isRefetchingUpComingData;

  return loading ? (
    <Loader>
      <ActivityIndicator size="small" />
    </Loader>
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
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            {trendingData ? (
              <FlatList
                style={{ marginTop: 20 }}
                horizontal
                data={trendingData.results}
                keyExtractor={(item) => item.id + ""}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 30 }}
                ItemSeparatorComponent={VSeparator}
                renderItem={({ item }) => (
                  <VMedia
                    posterPath={item.poster_path || ""}
                    originalTitle={item.original_title}
                    voteAverage={item.vote_average}
                  />
                )}
              />
            ) : null}
          </ListContainer>
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
