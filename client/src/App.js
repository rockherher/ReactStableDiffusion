import React, { useState } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Input,
  Button,
  Wrap,
  Stack,
  Image,
  Link,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';

const App = () => {
  const [image, updateImage] = useState(null);
  const [prompt, updatePrompt] = useState('');
  const [loading, updateLoading] = useState(false);

  const generate = async () => {
    updateLoading(true);
    try {
      const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`);
      updateImage(result.data);
    } catch (error) {
      console.error('Error fetching image:', error);
    } finally {
      updateLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Container>
        <Heading>Stable Diffusion🚀</Heading>
        <Text marginBottom={'10px'}>
          This react application leverages the model trained by Stability AI and
          Runway ML to generate images using the Stable Diffusion Deep Learning
          model. The model can be found via github here{' '}
          <Link
            href={'https://github.com/samcasmmm/ReactStableDiffusion/tree/main'}
          >
            Github
          </Link>
        </Text>
        <Wrap marginBottom={'10px'}>
          <Input
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={'350px'}
          />
          <Button onClick={generate} colorScheme='yellow'>
            Generate
          </Button>
        </Wrap>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : image ? (
          <Image src={`data:image/png;base64,${image}`} boxShadow='lg' />
        ) : null}
      </Container>
    </ChakraProvider>
  );
};

export default App;
