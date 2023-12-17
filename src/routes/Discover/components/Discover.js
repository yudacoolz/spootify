import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import  AuthService  from '../../../services/auth.service';
import NewReleasesService from '../../../services/NewReleases.service';
import featuredPlaylistService from '../../../services/featuredPlaylist.service';
import categoriesServices from '../../../services/categories.services';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
      accessToken: null,
    };
  }
  componentDidMount() {
    this.fetchAccessToken();
    this.fetchNewReleases();
    this.fetchFeaturedPlaylists();
    this.fetchCategories();
  }

  fetchAccessToken = async () => {
    await AuthService.getAccessToken();
    this.setState({ accessToken: AuthService.state.accessToken });
  };

  fetchNewReleases = async () => {
    try {
      const newReleasesData = await NewReleasesService.getNewReleases();
      console.log("new release : "+newReleasesData);
      this.setState({ newReleases: newReleasesData.albums.items });
    } catch (error) {
      console.error('Error fetching new releases:', error);
    }
  };
  fetchFeaturedPlaylists = async () => {
    try {
      const FeaturedPlaylists = await featuredPlaylistService.getFeaturedPlaylist();
      this.setState({ playlists: FeaturedPlaylists.playlists.items });
    } catch (error) {
      console.error('Error fetching featured playlist:', error);
    }
  };
  fetchCategories = async () => {
    try {
      const newCategories = await categoriesServices.getCategories();
      this.setState({ categories: newCategories.categories.items });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  render() {
    const { accessToken, newReleases, playlists, categories } = this.state;
  
    return (
      <div className="discover">
        {/* Bearer token: {accessToken} */}
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
