import {
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { axiosClient } from '@utils/axios-client';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface User {
  id: number;
  passphrase: string;
}

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loggedInUser, setLoggeInUser] = useState<User>();
  const [input, setInput] = useState<string>('');

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosClient
      .post('/api/auth/login', { passphrase: input })
      .then(({ data }) => {
        setLoggeInUser(data.data);
        setInput('');

        if (!users?.some((u) => u.id === data.data.id)) getAllUsers();
      })
      .catch(console.error);
  };

  const logout = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosClient
      .post('/api/auth/logout')
      .then(() => {
        setLoggeInUser(undefined);
      })
      .catch(console.error);
  };

  const getAllUsers = () => {
    axiosClient('/api/users')
      .then(({ data }) => {
        setUsers(data.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getAllUsers();
    axiosClient('/api/user')
      .then(({ data }) => {
        setLoggeInUser(data.data);
      })
      .catch(console.error);
  }, []);

  return (
    <VStack minH="100vh" justify="center" px={8} spacing={12}>
      <Head>
        <title>STDO</title>
        <meta
          name="description"
          content="Docker Swarm microservices deployed on DigitalOcean"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size="3xl" role="page-title">
          Swarm Traefik DigitalOcean
        </Heading>

        <VStack>
          <Text
            fontWeight="500"
            color={useColorModeValue('gray.800', 'gray.300')}
          >
            Docker Swarm microservices deployed on DigitalOcean
          </Text>

          <Flex gridGap={1} flexWrap="wrap" justify="center">
            {['nodejs', 'nextjs', 'typescript', 'https', 'auth'].map(
              (value) => {
                return (
                  <Tag
                    borderRadius="full"
                    key={value}
                    colorScheme="purple"
                    size="sm"
                  >
                    {value}
                  </Tag>
                );
              }
            )}
          </Flex>
        </VStack>
      </VStack>

      <VStack>
        <form onSubmit={loggedInUser ? logout : login}>
          <HStack>
            {!loggedInUser && (
              <Input
                placeholder="Login/Register"
                type="text"
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setInput(e.target.value);
                }}
              />
            )}
            <Button type="submit">{loggedInUser ? 'Log Out' : 'Log In'}</Button>
          </HStack>
        </form>

        <Flex gridGap={2} px={10}>
          {loggedInUser ? (
            <Text fontWeight="800">Signed in as {loggedInUser.passphrase}</Text>
          ) : (
            users?.map((user: User) => {
              return (
                <Tag
                  borderRadius="full"
                  key={user.id}
                  colorScheme="yellow"
                  onClick={() => {
                    setInput(user.passphrase);
                  }}
                  _hover={{
                    cursor: 'pointer',
                  }}
                >
                  {user.passphrase}
                </Tag>
              );
            })
          )}
        </Flex>
      </VStack>
    </VStack>
  );
};

export default Home;
