/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    if (!tag || !content || !Number.isInteger(count) || count <= 0) {
        console.error(
            'Некорректные входные данные. Убедитесь, что переданы имя тега, содержимое и положительное целое число в качестве количества вставок.',
        );
        return;
    }
    for (let i = 0; i < count; i++) {
        const element = document.createElement(tag);
        element.textContent = content;
        document.body.appendChild(element);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    if (
        !Number.isInteger(childrenCount) ||
        childrenCount <= 0 ||
        !Number.isInteger(level) ||
        level <= 0
    ) {
        console.error(
            'Некорректные входные данные.  childrenCount и level должны быть положительными целыми числами.',
        );
        return null;
    }

    function createNode(currentLevel) {
        const node = document.createElement('div');
        node.classList.add(`item_${currentLevel}`);

        if (currentLevel < level) {
            for (let i = 0; i < childrenCount; i++) {
                const childNode = createNode(currentLevel + 1);
                node.appendChild(childNode);
            }
        }
        return node;
    }
    return createNode(1);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/

export function replaceNodes() {
    const initialTree = generateTree(2, 3);

    function replaceLevel(node) {
        if (node.classList.contains('item_2')) {
            const section = document.createElement('section');
            section.classList.add(...node.classList);

            while (node.firstChild) {
                section.appendChild(node.firstChild);
            }

            node.parentNode.replaceChild(section, node);
            return section;
        } else {
            for (let i = 0; i < node.children.length; i++) {
                replaceLevel(node.children[i]);
            }
            return node;
        }
    }
    replaceLevel(initialTree);
    return initialTree;
}
