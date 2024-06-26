import { useRouter } from "next/router";
import { useRef } from "react";
import { Box, BoxContent, BoxTitle } from "../../../../components/General/box";
import { Button } from "../../../../components/General/button";
import { HeaderTitle } from "../../../../components/SystemLayout/header-title";
import { OutsetHeadersCornerRadius } from "../../../../components/SystemLayout/outset-radius-to-headers";
import { ProfilePic } from "../../../../components/SystemLayout/profile-pic/profile-pic";
import { SystemLayout } from "../../../../components/Layouts/_sysLayout";
import styled from "../../../../styles/_Pages/sys/forum.module.scss";

export default function ForumTopicPage() {
  const router = useRouter();
  const params = router.query;
  const answerTextRef = useRef<HTMLTextAreaElement>(null);
  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <OutsetHeadersCornerRadius>
          <HeaderTitle className="header-section">
            <h2>Nome da vaga aqui #{params.id}</h2>
            <Button
              className="outlined"
              onClick={() =>
                answerTextRef.current?.focus()
              }
              key="criar-resposta"
            >
              <i className="fa-solid fa-reply"></i>
              Responder
            </Button>
          </HeaderTitle>
        </OutsetHeadersCornerRadius>
        <div className="content">
          <Box>
            <BoxContent>
              <span>Empresa tal - 22/02/2022</span>
            </BoxContent>
          </Box>
          <Box>
            <BoxContent>
              <h3>Discussões sobre a vaga</h3>
              <br/>
              <div className={styled["forum-topic"]}>
                <div className={styled["topic-message"]}>
                  <div className={styled["sender-detail"]}>
                    <ProfilePic style={{ width: 50, height: 50 }} />
                    <div>
                      <h4>Álvaro</h4>
                      <span>há 12 minutos</span>
                    </div>
                  </div>
                  <div className={styled["message"]}>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ex molestiae nam assumenda velit debitis iure! Maiores
                      consectetur, quis, quibusdam nulla, incidunt adipisci modi
                      architecto cumque provident laborum expedita a mollitia
                      fuga esse asperiores. Aspernatur molestiae dignissimos
                      natus! Ex minima adipisci culpa omnis quaerat nihil
                      reiciendis? Porro labore aut officiis iusto asperiores
                      ratione expedita dicta optio fugiat. Nobis explicabo
                      placeat atque ipsa odit dolorem facere provident
                      aspernatur qui, vitae eos vero laudantium ipsam culpa
                      distinctio aliquid ut officia excepturi aperiam laboriosam
                      repellat totam quos cupiditate nemo. Asperiores tempore
                      eos facilis accusamus, quidem modi molestias, doloremque
                      ut dignissimos ratione, voluptatum dolorem quibusdam.
                    </p>
                  </div>
                </div>
                <div className={styled["forum-topic"]}>
                  <div className={styled["topic-message"]}>
                    <div className={styled["sender-detail"]}>
                      <ProfilePic style={{ width: 50, height: 50 }} />
                      <div>
                        <h4>Lucas</h4>
                        <span>há 10 minutos</span>
                      </div>
                    </div>
                    <div className={styled["message"]}>
                      <p>asdjasl daslkdj aslk daslk ldkja slk</p>
                    </div>
                  </div>
                  <div className={styled["forum-topic"]}>
                  <div className={styled["topic-message"]}>
                    <div className={styled["sender-detail"]}>
                      <ProfilePic style={{ width: 50, height: 50 }} />
                      <div>
                        <h4>Paulo Costa</h4>
                        <span>há 3 minutos</span>
                      </div>
                    </div>
                    <div className={styled["message"]}>
                      <p> nem sempre aquelas e sim</p>
                    </div>
                  </div>
                </div>
                </div>
                <div className={styled["forum-topic"]}>
                  <div className={styled["topic-message"]}>
                    <div className={styled["sender-detail"]}>
                      <ProfilePic style={{ width: 50, height: 50 }} />
                      <div>
                        <h4>Paulo</h4>
                        <span>há 7 minutos</span>
                      </div>
                    </div>
                    <div className={styled["message"]}>
                      <p>Sempre né sempre aquelas e sim</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styled["forum-topic"]}>
                <div className={styled["topic-message"]}>
                  <div className={styled["sender-detail"]}>
                    <ProfilePic style={{ width: 50, height: 50 }} />
                    <div>
                      <h4>Pedro</h4>
                      <span>há 11 minutos</span>
                    </div>
                  </div>
                  <div className={styled["message"]}>
                    <p>asdjasl daslkdj aslk daslk ldkja slk</p>
                  </div>
                </div>
              </div>
            </BoxContent>
          </Box>
          <Box className={styled["box-newAnswer"]} id="newComment">
            <BoxTitle>Responder</BoxTitle>
            <BoxContent>
              <form action="">
                <textarea
                  name="newanswer"
                  id="newanswerfield"
                  className="new-answer-field"
                  ref={answerTextRef}
                ></textarea>
                <Button type="submit">
                  Enviar <i className="fa-solid fa-paper-plane"></i>
                </Button>
              </form>
            </BoxContent>
          </Box>
        </div>
      </section>
      </>
  );
}

ForumTopicPage.getLayout = (page: any) => <SystemLayout>{page}</SystemLayout>;