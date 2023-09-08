import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import SelectDropdown from 'react-native-select-dropdown';

import {PUBLIC_KEY} from '@env';

const HomeScreen = () => {
  const [comments, setComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState(1);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  useEffect(() => {
    axios
      .get(PUBLIC_KEY, {
        headers: {
          'Accept-Language': 'en',
        },
      })
      .then(response => setComments(response.data))
      .catch(error => console.error(error));
  }, []);

  const getCommentsForSelectedPost = () => {
    if (!selectedPost) return comments;
    return comments.filter(comment => comment.postId === selectedPost);
  };

  const idArray = [...new Set(comments.map(item => item.postId))];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{marginTop: 100}}>
        <SelectDropdown
          dropdownStyle={styles.dropdown}
          data={idArray}
          onSelect={(selectedItem, index) => {
            setSelectedPost(selectedItem);
          }}
        />
      </View>

      <View>
        {selectedPost && (
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              margin: 10,
              color: 'black',
              marginTop: 80,
            }}>
            Post {selectedPost}
          </Text>
        )}
        <FlatList
          data={getCommentsForSelectedPost()}
          renderItem={({item, index}) => (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                padding: 10,
              }}>
              {index === 0 ? (
                <Text
                  style={{
                    color: 'black',
                    fontWeight: index === 0 ? 'bold' : 'normal',
                  }}>
                  {item.name}
                  {'\n'}
                  {item.body}
                </Text>
              ) : (
                <Text
                  style={{
                    color: 'black',
                    fontWeight: index === 0 ? 'bold' : 'normal',
                  }}>
                  {item.body}
                </Text>
              )}
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdown: {},
});
