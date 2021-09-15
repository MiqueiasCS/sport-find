import Header from "../../components/Header";
import GroupCard from "../../components/GroupCard";
import { Container, GroupsContainer } from "./styles";
import ArrowLeft from "../../components/ArrowLeft";
import { useGroups } from "../../providers/Groups";
import CategoryItem from "../../components/CategoryItem";
import { useState, useEffect } from "react";

const Groups = () => {
  const { allGroups } = useGroups();
  const [groupList, setGroupList] = useState(allGroups);

  useEffect(() => {
    setGroupList(allGroups);
  }, [allGroups]);

  const categoryFilter = (chosenCategory: string) => {
    if (chosenCategory === "Todos") {
      setGroupList(allGroups);
    } else {
      let filteredGroups = allGroups.filter(
        (group) => group.category === chosenCategory
      );
      setGroupList(filteredGroups);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <header>
          <ArrowLeft />
          <h1>Grupos</h1>
        </header>
        <CategoryItem filterCategory={categoryFilter} />
        <article>
          <GroupsContainer>
            {groupList.map((group, index) => (
              <GroupCard key={index} group={group} />
            ))}
          </GroupsContainer>
        </article>
      </Container>
    </>
  );
};
export default Groups;
