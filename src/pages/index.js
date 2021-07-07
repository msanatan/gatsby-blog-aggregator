import * as React from 'react'
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap'
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => {
  console.log(data)
  const { items } = data.allCustomApi.nodes[0]

  const postChunks = chunk(items, 3)

  const postRows = postChunks.map((postChunk, index) => {
    const postCols = postChunk.map((post, index) => {

      return (
        < Col sm='4' key={post.ID} className='d-flex justify-content-center' >
          <Card style={{ width: '18rem' }} className='my-3'>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.description}</Card.Text>
              <Button variant='primary' as='a' href={post.link} target='_blank' rel='noopener nofollow noreferrer'>Read More</Button>
            </Card.Body>
          </Card>
        </Col >
      )
    })

    return <Row key={index} className='justify-content-center'>{postCols}</Row>
  })

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col sm={8}>
          <Nav className='justify-content-center' activeKey='/home'>
            <Nav.Item>
              <Nav.Link href='/home'>Irie Tech Blogs</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      {postRows}
    </Container>
  )
}

export const getBlogPostsQuery = graphql`
  query GetBlogPosts {
    allCustomApi {
      nodes {
        total
        items {
          ID
          published
          description
          link
          title
          PublishDate
        }
      }
    }
  }
`

const chunk = (arr, chunkSize = 1, cache = []) => {
  const tmp = [...arr]
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}

export default IndexPage
