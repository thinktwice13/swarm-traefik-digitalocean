import { Box, Flex, Heading, Tag, Text, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack minH="100vh" justify="center" px={8} spacing={4}>
        <Heading as="h1" size="4xl">
          Swarm Traefik DigitalOcean
        </Heading>

        <VStack>
          <Text>Docker Swarm microservices deployed on DigitalOcean</Text>
          <Flex gridGap={2}>
            {['nodejs', 'nextjs', 'typescript', 'authentication'].map(
              (value) => {
                return (
                  <Tag borderRadius="full" key={value} colorScheme="purple">
                    {value}
                  </Tag>
                );
              }
            )}
          </Flex>
        </VStack>

        <Auth />
      </VStack>
    </>
  );
};

const Auth = () => {
  return <Box>Auth goes here TODO</Box>;
};

export default Home;