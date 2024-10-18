import React, {FC, ReactElement, useState} from 'react';
2	import {
3	  Alert,
4	  View,
5	  SafeAreaView,
6	  Image,
7	  ScrollView,
8	  StatusBar,
9	  StyleSheet,
10	  TouchableOpacity,
11	} from 'react-native';
12	import Parse from 'parse/react-native';
13	import {
14	  List,
15	  Title,
16	  IconButton,
17	  Text as PaperText,
18	  Button as PaperButton,
19	  TextInput as PaperTextInput,
20	} from 'react-native-paper';
21	
22	export const List: FC<{}> = ({}): ReactElement => {
23	  // State variables
24	  const [readResults, setReadResults] = useState<[Parse.Object]>();
25	  const [newTitle, setNewTitle] = useState('');
26	
27	  // Functions used by the screen components
28	  const createList = async function (): Promise<boolean> {
29	    // This value comes from a state variable
30	    const newListTitleValue: string = newTitle;
31	    // Creates a new Todo parse object instance
32	    let List: Parse.Object = new Parse.Object('List');
33	    Todo.set('title', newTodoTitleValue);
34	    Todo.set('done', false);
35	    // After setting the todo values, save it on the server
36	    try {
37	      await List.save();
38	      // Success
39	      Alert.alert('Success!', 'List created!');
40	      // Refresh todos list to show the new one (you will create this function later)
41	      readList();
42	      return true;
43	    } catch (error) {
44	      // Error can be caused by lack of Internet connection
45	      Alert.alert('Error!', error.message);
46	      return false;
47	    }
48	  };
49	
50	  const readList = async function (): Promise<boolean> {
51	    // Reading parse objects is done by using Parse.Query
52	    const parseQuery: Parse.Query = new Parse.Query('List');
53	    try {
54	      let todos: Parse.Object[] = await parseQuery.find();
55	      // Be aware that empty or invalid queries return as an empty array
56	      // Set results to state variable
57	      setReadResults(todos);
58	      return true;
59	    } catch (error) {
60	      // Error can be caused by lack of Internet connection
61	      Alert.alert('Error!', error.message);
62	      return false;
63	    }
64	  };
65	
66	  const updateList = async function (
67	    listId: string,
68	    done: boolean,
69	  ): Promise<boolean> {
70	    // Create a new todo parse object instance and set list id
71	    let list: Parse.Object = new Parse.Object('List');
72	    List.set('objectId', listId);
73	    // Set new done value and save Parse Object changes
74	    List.set('done', done);
75	    try {
76	      await List.save();
77	      // Success
78	      Alert.alert('Success!', 'List updated!');
79	      // Refresh list
80	      readList();
81	      return true;
82	    } catch (error) {
83	      // Error can be caused by lack of Internet connection
84	      Alert.alert('Error!', error.message);
85	      return false;
86	    }
87	  };
88	
89	  const deleteList = async function (listId: string): Promise<boolean> {
90	    // Create a new list parse object instance and set list id
91	    let List: Parse.Object = new Parse.Object('List');
92	   List.set('objectId', listId);
93	    // .destroy should be called to delete a parse object
94	    try {
95	      await list.destroy();
96	      Alert.alert('Success!', 'List deleted!');
97	      // Refresh list to remove this one
98	      readList();
99	      return true;
100	    } catch (error) {
101	      // Error can be caused by lack of Internet connection
102	      Alert.alert('Error!', error.message);
103	      return false;
104	    }
105	  };
106	
107	  return (
108	    <>
109	      <StatusBar backgroundColor="#208AEC" />
110	      <SafeAreaView style={Styles.container}>
111	        <View style={Styles.header}>
112	          <Image
113	            style={Styles.header_logo}
114	            source={ {
115	              uri:
116	                'https://blog.back4app.com/wp-content/uploads/2019/05/back4app-white-logo-500px.png',
117	            } }
118	          />
119	          <PaperText style={Styles.header_text_bold}>
120	            {'React Native on Back4App'}
121	          </PaperText>
122	          <PaperText style={Styles.header_text}>{'Product Creation'}</PaperText>
123	        </View>
124	        <View style={Styles.wrapper}>
125	          <View style={Styles.flex_between}>
126	            <Title>List</Title>
127	            {/* List read (refresh) button */}
128	            <IconButton
129	              icon="refresh"
130	              color={'#208AEC'}
131	              size={24}
132	              onPress={() => readList()}
133	            />
134	          </View>
135	          <View style={Styles.create_list_container}>
136	            {/* Todo create text input */}
137	            <PaperTextInput
138	              value={newTodoTitle}
139	              onChangeText={text => setNewListTitle(text)}
140	              label="New List"
141	              mode="outlined"
142	              style={Styles.create_list_input}
143	            />
144	            {/* Todo create button */}
145	            <PaperButton
146	              onPress={() => createList()}
147	              mode="contained"
148	              icon="plus"
149	              color={'#208AEC'}
150	              style={Styles.create_list_button}>
151	              {'Add'}
152	            </PaperButton>
153	          </View>
154	          <ScrollView>
155	            {/*read results list */}
156	            {readResults !== null &&
157	              readResults !== undefined &&
158	              readResults.map((list: Parse.Object) => (
159	                <list.Item
160	                  key={list.id}
161	                  title={list.get('title')}
162	                  titleStyle={
163	                    list.get('done') === true
164	                      ? Styles.list_text_done
165	                      : Styles.list_text
166	                  }
167	                  style={Styles.list_item}
168	                  right={props => (
169	                    <>
170	                      {/* List update button */}
171	                      {list.get('done') !== true && (
172	                        <TouchableOpacity
173	                          onPress={() => updateList(list.id, true)}>
174	                          <List.Icon
175	                            {...props}
176	                            icon="check"
177	                            color={'#4CAF50'}
178	                          />
179	                        </TouchableOpacity>
180	                      )}
181	                      {/*delete button */}
182	                      <TouchableOpacity onPress={() => deleteList(list.id)}>
183	                        <List.Icon {...props} icon="close" color={'#ef5350'} />
184	                      </TouchableOpacity>
185	                    </>
186	                  )}
187	                />
188	              ))}
189	          </ScrollView>
190	        </View>
191	      </SafeAreaView>
192	    </>
193	  );
194	};
195	
196	// These define the screen component styles
197	const Styles = StyleSheet.create({
198	  container: {
199	    flex: 1,
200	    backgroundColor: '#FFF',
201	  },
202	  wrapper: {
203	    width: '90%',
204	    alignSelf: 'center',
205	  },
206	  header: {
207	    alignItems: 'center',
208	    paddingTop: 10,
209	    paddingBottom: 20,
210	    backgroundColor: '#208AEC',
211	  },
212	  header_logo: {
213	    width: 170,
214	    height: 40,
215	    marginBottom: 10,
216	    resizeMode: 'contain',
217	  },
218	  header_text_bold: {
219	    color: '#fff',
220	    fontSize: 14,
221	    fontWeight: 'bold',
222	  },
223	  header_text: {
224	    marginTop: 3,
225	    color: '#fff',
226	    fontSize: 14,
227	  },
228	  flex_between: {
229	    flexDirection: 'row',
230	    alignItems: 'center',
231	    justifyContent: 'space-between',
232	  },
233	  create_list_container: {
234	    flexDirection: 'row',
235	  },
236	  create_list_input: {
237	    flex: 1,
238	    height: 38,
239	    marginBottom: 16,
240	    backgroundColor: '#FFF',
241	    fontSize: 14,
242	  },
243	  create_list_button: {
244	    marginTop: 6,
245	    marginLeft: 15,
246	    height: 40,
247	  },
248	  list_item: {
249	    borderBottomWidth: 1,
250	    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
251	  },
252	  list_text: {
253	    fontSize: 15,
254	  },
255	  list_text_done: {
256	    color: 'rgba(0, 0, 0, 0.3)',
257	    fontSize: 15,
258	    textDecorationLine: 'line-through',
