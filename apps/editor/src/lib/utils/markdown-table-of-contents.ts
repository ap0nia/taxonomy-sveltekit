import type {
  Blockquote,
  Code,
  Definition,
  FootnoteDefinition,
  Heading,
  Html,
  InlineCode,
  List,
  ListItem,
  Nodes,
  Paragraph,
  Table,
  Text,
  ThematicBreak,
} from 'mdast'
import { toc } from 'mdast-util-toc'
import { remark } from 'remark'
import { visit } from 'unist-util-visit'
import type { Data, VFile } from 'vfile'

interface Item {
  title: string
  url: string
  items?: Item[]
}

interface Items {
  items?: Item[]
}

type TextType = Text | InlineCode

type AnyNode =
  | List
  | ListItem
  | Paragraph
  | Html
  | Blockquote
  | Code
  | Heading
  | Table
  | ThematicBreak
  | Definition
  | FootnoteDefinition

const textTypes = ['text', 'emphasis', 'strong', 'inlineCode']

function flattenNode(node: TextType) {
  const p: string[] = []

  visit(node, (node) => {
    if (!textTypes.includes(node.type)) return
    p.push(node.value)
  })

  return p.join(``)
}

function getItems(node?: AnyNode, current: Data = {}): Data {
  if (node == null) {
    return {}
  }

  if (node.type === 'paragraph') {
    visit(node, (item) => {
      if (item.type === 'link') {
        current['url'] = item.url
        current['title'] = flattenNode(node as any)
      }

      if (item.type === 'text') {
        current['title'] = flattenNode(node as any)
      }
    })

    return current
  }

  if (node.type === 'list') {
    current['items'] = node.children.map((i) => getItems(i, {}))
    return current
  }

  if (node.type === 'listItem') {
    const heading = getItems(node.children[0], {})

    if (node.children.length > 1) {
      getItems(node.children[1], heading)
    }

    return heading
  }

  return {}
}

function remarkTableOfContentsPlugin() {
  return (node: Nodes, file: VFile) => {
    const table = toc(node)
    file.data = getItems(table.map, {})
  }
}

export type TableOfContents = Items

export async function getTableOfContents(content: string): Promise<TableOfContents> {
  const result = await remark().use(remarkTableOfContentsPlugin).process(content)
  return result.data
}
