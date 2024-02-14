import Link from "next/link";
import { Box, BoxContent } from "../../../components/General/box";
import { Button } from "../../../components/General/button";
import { FabButton } from "../../../components/General/fab";
import { HeaderTitle } from "../../../components/SystemLayout/header-title";
import { OutsetHeadersCornerRadius } from "../../../components/SystemLayout/outset-radius-to-headers";
import { ProfilePic } from "../../../components/SystemLayout/profile-pic/profile-pic";
import { SystemLayout } from "../_layout";
import styled from "../../../styles/_Pages/sys/forum.module.scss";

export default function ForumPage() {
  return (
    <SystemLayout>
      <section className={styled["container"]}>
        <OutsetHeadersCornerRadius>
          <HeaderTitle>
            <FabButton className="FabCreateNew" type="button">
              <i className="fas fa-filter"></i>
            </FabButton>
            <h2>Fórum</h2>
            <Button className="outlined" key="create-new-vaga-btn" id="filtro">
              Filtros <i className="fas fa-filter"></i>
            </Button>
          </HeaderTitle>
        </OutsetHeadersCornerRadius>
        <div className="content">
          <Box>
            <BoxContent className="topics">
              <div className="topic">
                <Link href="forum/12" className="pessoa-forum-group" passHref>
                  <div className="vaga-forum-info">
                    <h3>
                      Assistente administrativo{" "}
                      <span className="topicID">#12</span>
                    </h3>
                    <div className="topic-meta">
                      <span>Nome empresa </span>
                      <span>- 02/03/2002</span>
                    </div>
                  </div>
                  <div className="last-answer">
                    <i className="fa-solid fa-arrow-turn-up"></i>
                    <div className="answer-content">
                      <ProfilePic className="candidato-pic" />
                      <span className="pessoa-forum-info">
                        <span className="name">Alvaro</span>
                        <p className="message">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry?
                        </p>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="topic">
                <Link href="forum/12" className="pessoa-forum-group" passHref>
                  <div className="vaga-forum-info">
                    <h3>Bolsista desenvolvedor de software</h3>
                    <div className="topic-meta">
                      <span>Jolos Company </span>
                      <span>- 02/03/2002</span>
                    </div>
                  </div>
                  <div className="last-answer">
                    <i className="fa-solid fa-arrow-turn-up"></i>

                    <div className="answer-content">
                      <ProfilePic className="candidato-pic" />
                      <span className="pessoa-forum-info">
                        <span className="name">
                          Alvaro - <span>há 2 min</span>
                        </span>
                        <p className="message">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Pellentesque et tortor felis. Duis et metus
                          sodales, tempus neque et, facilisis libero. Mauris in
                          leo ornare, suscipit metus sit amet, porttitor erat.
                          Cras hendrerit, turpis sed posuere auctor, ligula eros
                          iaculis sem, non laoreet odio dui sed nisi. Donec ut
                          tortor in eros dapibus dictum ac quis lectus. Sed
                          tortor arcu, lacinia eu ante id, vulputate eleifend
                          nibh. Fusce suscipit, arcu in consequat sodales, lacus
                          tellus faucibus tellus, at accumsan ligula lorem vitae
                          orci. Proin turpis sapien, pulvinar sit amet lectus
                          non, hendrerit ornare justo. In vel ullamcorper mi, eu
                          ultrices purus. Cras imperdiet molestie auctor.
                          Integer a viverra sapien.
                        </p>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </BoxContent>
          </Box>
        </div>
      </section>
    </SystemLayout>
  );
}
