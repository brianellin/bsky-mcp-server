# Thread Examples Processing Results

## File: post_thread.json

### Thread:
```xml
<posts>
<post type="standalone" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmuyulsoc2n" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 8:47:49 AM">
  <content>
    why bluesky &quot;feeds&quot; don&apos;t work, a thread
  </content>
  Engagement: 494 likes, 74 reposts, 18 replies, 26 quotes
  <replies>
    <post type="reply" uri="at://did:plc:zjbq26wybii5ojoypkso2mso/app.bsky.feed.post/3lmq52kcous2q" bsky_url="https://bsky.app/profile/jauntywk.bsky.social/post/3lmq52kcous2q" author_name="JauntyWunderKind" author_handle="jauntywk.bsky.social" posted_at="4/13/2025, 3:49:54 PM">
      <content>
        /cc @jus7curious.bsky.social
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
    </post>
    <post type="reply" uri="at://did:plc:xxw6nvpnleocmp3nqurrc3vm/app.bsky.feed.post/3lmn5gtno6k2t" bsky_url="https://bsky.app/profile/mrmurphy.dev/post/3lmn5gtno6k2t" author_name="Murphy R" author_handle="mrmurphy.dev" posted_at="4/12/2025, 11:18:47 AM">
      <content>
        I’ve noticed a significant drop in enjoyable content on BlueSky vs Instagram. I figured it was mostly due to most of the high quality creators spending their energy on Insta and TilTok. This take is additional interesting perspective.

I love the BlueSky ethos though, and want it to persist!
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
      Engagement: 27 likes, 0 reposts, 0 replies
    </post>
    <post type="reply,quote" uri="at://did:plc:xk32a4krl4hoty3hk3axjdz4/app.bsky.feed.post/3lmmvizjllk2q" bsky_url="https://bsky.app/profile/coverfire.com/post/3lmmvizjllk2q" author_name="Dan Siemon" author_handle="coverfire.com" posted_at="4/12/2025, 8:56:50 AM">
      <content>
        Is the abstractions wrong or tooling? I want an easy way to mark a post I found somewhere else to show up in my Network Nook feed. A way to tag in the main BlueSky app could facilitate that.

bsky.app/profile/cove...
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
      Engagement: 1 likes, 0 reposts, 2 replies
      <replies>
        <post type="reply" uri="at://did:plc:zvinwh7vy4tjegch2hxvopdd/app.bsky.feed.post/3lmmwb3u4xs2m" bsky_url="https://bsky.app/profile/tentacle.expert/post/3lmmwb3u4xs2m" author_name="xormetric" author_handle="tentacle.expert" posted_at="4/12/2025, 9:10:19 AM">
          <content>
            i just run a &quot;labeler&quot; that doesnt emit any labels. you can do whatever you want with the report endpoint. it *is* 4 clicks to actually do a report but it&apos;s an easy way to integrate into the current app
          </content>
          <reply_to uri="at://did:plc:xk32a4krl4hoty3hk3axjdz4/app.bsky.feed.post/3lmmvizjllk2q"></reply_to>
          Engagement: 9 likes, 0 reposts, 2 replies
          <replies>
            <post type="reply" uri="at://did:plc:xk32a4krl4hoty3hk3axjdz4/app.bsky.feed.post/3lmmwsgfems2q" bsky_url="https://bsky.app/profile/coverfire.com/post/3lmmwsgfems2q" author_name="Dan Siemon" author_handle="coverfire.com" posted_at="4/12/2025, 9:19:59 AM">
              <content>
                Interesting. Your labeler backend adds the post to a DB or something that serves the feed? I use Supercell for my feed. It doesn&apos;t separate matching and serving with an out of process DB.
              </content>
              <reply_to uri="at://did:plc:zvinwh7vy4tjegch2hxvopdd/app.bsky.feed.post/3lmmwb3u4xs2m"></reply_to>
              Engagement: 1 likes, 0 reposts, 1 replies
              <replies>
                <post type="reply" uri="at://did:plc:zvinwh7vy4tjegch2hxvopdd/app.bsky.feed.post/3lmmypbdohc2m" bsky_url="https://bsky.app/profile/tentacle.expert/post/3lmmypbdohc2m" author_name="xormetric" author_handle="tentacle.expert" posted_at="4/12/2025, 9:54:05 AM">
                  <content>
                    basically, yeah (although in my case it&apos;s remove a post from the DB). same server process as the feed generation (and technically the DB too since it&apos;s sqlite) just serving the labeler report route too.

codeberg.org/xormetric/pi...
                  </content>
                  <reply_to uri="at://did:plc:xk32a4krl4hoty3hk3axjdz4/app.bsky.feed.post/3lmmwsgfems2q"></reply_to>
                  Engagement: 1 likes, 0 reposts, 0 replies
                </post>
              </replies>
            </post>
            <post type="reply" uri="at://did:plc:jx4g6baqkwdlonylsetvpu7c/app.bsky.feed.post/3lmmyw26les2a" bsky_url="https://bsky.app/profile/aviva.gay/post/3lmmyw26les2a" author_name="🦌" author_handle="aviva.gay" posted_at="4/12/2025, 9:57:49 AM">
              <content>
                i want a deer social feature to add arbitrary http / webhook style endpoints you can hit that reference a given post via button / action menu / gesture maybe, does this fill your use case
              </content>
              <reply_to uri="at://did:plc:zvinwh7vy4tjegch2hxvopdd/app.bsky.feed.post/3lmmwb3u4xs2m"></reply_to>
              Engagement: 9 likes, 0 reposts, 1 replies
              <replies>
                <post type="reply" uri="at://did:plc:zvinwh7vy4tjegch2hxvopdd/app.bsky.feed.post/3lmmziw23w22m" bsky_url="https://bsky.app/profile/tentacle.expert/post/3lmmziw23w22m" author_name="xormetric" author_handle="tentacle.expert" posted_at="4/12/2025, 10:08:22 AM">
                  <content>
                    definitely would (as long as it works on profiles too and i can set multiple)
                  </content>
                  <reply_to uri="at://did:plc:jx4g6baqkwdlonylsetvpu7c/app.bsky.feed.post/3lmmyw26les2a"></reply_to>
                  Engagement: 6 likes, 0 reposts, 1 replies
                  <replies>
                    <post type="reply" uri="at://did:plc:jx4g6baqkwdlonylsetvpu7c/app.bsky.feed.post/3lmmzp5u2ec2a" bsky_url="https://bsky.app/profile/aviva.gay/post/3lmmzp5u2ec2a" author_name="🦌" author_handle="aviva.gay" posted_at="4/12/2025, 10:11:52 AM">
                      <content>
                        yeah my thinking is it would go in the context menu (so anywhere that can be used), add as many as you want, and each would be either:
open url in new tab
open as iframe
http post

and you’d configure the url with like curly brace templating

maybe just let you run arbitrary javascript tbh
                      </content>
                      <reply_to uri="at://did:plc:zvinwh7vy4tjegch2hxvopdd/app.bsky.feed.post/3lmmziw23w22m"></reply_to>
                      Engagement: 4 likes, 0 reposts, 1 replies
                      <replies>
                        <post type="reply" uri="at://did:plc:zvinwh7vy4tjegch2hxvopdd/app.bsky.feed.post/3lmnaku77j22b" bsky_url="https://bsky.app/profile/tentacle.expert/post/3lmnaku77j22b" author_name="xormetric" author_handle="tentacle.expert" posted_at="4/12/2025, 12:14:46 PM">
                          <content>
                            hmm yeah there&apos;s definitely a need for more flexibility than just templating

a fake labeler works particularly well for integration because it also integrates auth i can verify on my end. but i wouldn&apos;t expect/want all the services i put into a config to get my did
                          </content>
                          <reply_to uri="at://did:plc:jx4g6baqkwdlonylsetvpu7c/app.bsky.feed.post/3lmmzp5u2ec2a"></reply_to>
                          Engagement: 3 likes, 0 reposts, 1 replies
                          <replies>
                            <post type="reply" uri="at://did:plc:jx4g6baqkwdlonylsetvpu7c/app.bsky.feed.post/3lmnapn6xl22a" bsky_url="https://bsky.app/profile/aviva.gay/post/3lmnapn6xl22a" author_name="🦌" author_handle="aviva.gay" posted_at="4/12/2025, 12:17:24 PM">
                              <content>
                                i think the obvious (but less friendly) solution is to let you write an async js function with access to the record, current agent, and maybe a callback to open an iframe

that way you can decide what to include and how to structure the request as needed
                              </content>
                              <reply_to uri="at://did:plc:zvinwh7vy4tjegch2hxvopdd/app.bsky.feed.post/3lmnaku77j22b"></reply_to>
                              Engagement: 1 likes, 0 reposts, 0 replies
                            </post>
                          </replies>
                        </post>
                      </replies>
                    </post>
                  </replies>
                </post>
              </replies>
            </post>
          </replies>
        </post>
        <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmvlr2aok2k" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmvlr2aok2k" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 8:58:23 AM">
          <content>
            i mean ultimately there’s many ways to get to the same place. the abstraction can stay generic if there are specific affordances to get you on the happy path.
          </content>
          <reply_to uri="at://did:plc:xk32a4krl4hoty3hk3axjdz4/app.bsky.feed.post/3lmmvizjllk2q"></reply_to>
          Engagement: 2 likes, 0 reposts, 1 replies
          <replies>
            <post type="reply" uri="at://did:plc:xk32a4krl4hoty3hk3axjdz4/app.bsky.feed.post/3lmmvr36dmk2q" bsky_url="https://bsky.app/profile/coverfire.com/post/3lmmvr36dmk2q" author_name="Dan Siemon" author_handle="coverfire.com" posted_at="4/12/2025, 9:01:20 AM">
              <content>
                Right. A third party app that had a quick way to add a post to a feed might help too but I really don&apos;t want to use a third party app all the time.
              </content>
              <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmvlr2aok2k"></reply_to>
              Engagement: 1 likes, 0 reposts, 0 replies
            </post>
          </replies>
        </post>
      </replies>
    </post>
    <post type="reply" uri="at://did:plc:uyex2smrqix2fy3f6bx6o4jd/app.bsky.feed.post/3lmmys77dnc2q" bsky_url="https://bsky.app/profile/timonsku.zip/post/3lmmys77dnc2q" author_name="Timon" author_handle="timonsku.zip" posted_at="4/12/2025, 9:55:40 AM">
      <content>
        Agreed, in general I think feeds need more work. There is not enough tools to meaningfully make feeds and the user control over them is non-existent. Right now if you want to do any user side configuration on a feed it would have to be done over some external website. Thats not a viable experience.
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
      Engagement: 6 likes, 0 reposts, 1 replies
      <replies>
        <post type="reply" uri="at://did:plc:uyex2smrqix2fy3f6bx6o4jd/app.bsky.feed.post/3lmmys7nrkk2q" bsky_url="https://bsky.app/profile/timonsku.zip/post/3lmmys7nrkk2q" author_name="Timon" author_handle="timonsku.zip" posted_at="4/12/2025, 9:55:40 AM">
          <content>
            The general idea of having multiple user chosen feeds is great but they are way to basic right now and making a meaningful feed is crazy hard. You need some tools that let users build feed with algorithmic primitives that can be tuned with knobs by a layperson.
          </content>
          <reply_to uri="at://did:plc:uyex2smrqix2fy3f6bx6o4jd/app.bsky.feed.post/3lmmys77dnc2q"></reply_to>
          Engagement: 0 likes, 0 reposts, 1 replies
          <replies>
            <post type="reply" uri="at://did:plc:uyex2smrqix2fy3f6bx6o4jd/app.bsky.feed.post/3lmmys7nsjs2q" bsky_url="https://bsky.app/profile/timonsku.zip/post/3lmmys7nsjs2q" author_name="Timon" author_handle="timonsku.zip" posted_at="4/12/2025, 9:55:41 AM">
              <content>
                Also the ability to block/opt-out of feeds becomes important as we can see with Discover. You should have the ability to say you don&apos;t want your posts be ingested by a particular feed if that spills people into your mentions that you don&apos;t like to be interacting with.
              </content>
              <reply_to uri="at://did:plc:uyex2smrqix2fy3f6bx6o4jd/app.bsky.feed.post/3lmmys7nrkk2q"></reply_to>
              Engagement: 0 likes, 0 reposts, 1 replies
              <replies>
                <post type="reply" uri="at://did:plc:uyex2smrqix2fy3f6bx6o4jd/app.bsky.feed.post/3lmmywzon6s2q" bsky_url="https://bsky.app/profile/timonsku.zip/post/3lmmywzon6s2q" author_name="Timon" author_handle="timonsku.zip" posted_at="4/12/2025, 9:58:22 AM">
                  <content>
                    At the end of the day, a feed is what makes or breaks a social network.
If you don&apos;t do that well you are just a chronological single topic forum like Mastodon.
                  </content>
                  <reply_to uri="at://did:plc:uyex2smrqix2fy3f6bx6o4jd/app.bsky.feed.post/3lmmys7nsjs2q"></reply_to>
                </post>
              </replies>
            </post>
          </replies>
        </post>
      </replies>
    </post>
    <post type="reply" uri="at://did:plc:uvuzsptk4b22b63xowm62chr/app.bsky.feed.post/3lmnio5kcvs22" bsky_url="https://bsky.app/profile/reedharmeyer.bsky.social/post/3lmnio5kcvs22" author_name="Reed Harmeyer" author_handle="reedharmeyer.bsky.social" posted_at="4/12/2025, 2:39:44 PM">
      <content>
        I’ve been thinking about this a lot with @skylight.social.

The analogy I came up with is that if the FYP is like a DJ then maybe a custom video feed could be like a list of song requests.

That was one way we could emphasize curation over ranking.
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
      Engagement: 4 likes, 0 reposts, 1 replies
      <replies>
        <post type="reply" uri="at://did:plc:uvuzsptk4b22b63xowm62chr/app.bsky.feed.post/3lmnivno6p222" bsky_url="https://bsky.app/profile/reedharmeyer.bsky.social/post/3lmnivno6p222" author_name="Reed Harmeyer" author_handle="reedharmeyer.bsky.social" posted_at="4/12/2025, 2:43:56 PM">
          <content>
            Another feature we thought of was a way to “share my feed” - again curation over ranking.
          </content>
          <reply_to uri="at://did:plc:uvuzsptk4b22b63xowm62chr/app.bsky.feed.post/3lmnio5kcvs22"></reply_to>
        </post>
      </replies>
    </post>
    <post type="reply" uri="at://did:plc:qzotib4l3dva6fjr5whiggcf/app.bsky.feed.post/3lmmwpnssl225" bsky_url="https://bsky.app/profile/digitalvagrant.bsky.social/post/3lmmwpnssl225" author_name="DigitalVagrant" author_handle="digitalvagrant.bsky.social" posted_at="4/12/2025, 9:18:27 AM">
      <content>
        📌
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
    </post>
    <post type="reply" uri="at://did:plc:nvb5cupjzu5cfogbvc7gjv4v/app.bsky.feed.post/3lmmwkegs5c2m" bsky_url="https://bsky.app/profile/miguelcarvalho.xyz/post/3lmmwkegs5c2m" author_name="Miguel Carvalho" author_handle="miguelcarvalho.xyz" posted_at="4/12/2025, 9:15:30 AM">
      <content>
        Can AI help with this? I mean, it should be good enough at categorizing stuff, getting a good sense of tone and feelings. Mix and matching this with some algorithms to personalize feed to each individual needs and taste could work, right?
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
      Engagement: 1 likes, 0 reposts, 1 replies
      <replies>
        <post type="reply" uri="at://did:plc:cjinybngj7dlvspewakwjab2/app.bsky.feed.post/3lmocjsyjn22d" bsky_url="https://bsky.app/profile/mindplay.dk/post/3lmocjsyjn22d" author_name="Rasmus Schultz" author_handle="mindplay.dk" posted_at="4/12/2025, 10:22:36 PM">
          <content>
            modern algorithms like these usually have elements of AI, yes 🙂
          </content>
          <reply_to uri="at://did:plc:nvb5cupjzu5cfogbvc7gjv4v/app.bsky.feed.post/3lmmwkegs5c2m"></reply_to>
          Engagement: 1 likes, 0 reposts, 0 replies
        </post>
      </replies>
    </post>
    <post type="reply" uri="at://did:plc:mm6g3tgaumdqvfvlij526zz7/app.bsky.feed.post/3lmnxqcgpl22q" bsky_url="https://bsky.app/profile/moni.fans/post/3lmnxqcgpl22q" author_name="Moni 💋" author_handle="moni.fans" posted_at="4/12/2025, 7:09:28 PM">
      <content>
        two parts id add. first - i think a lot more users should be adding words to the muted words list 
second - if the search / explore page let users add keywords instead of categories, and tried to pull results from starter packs or custom lists/feeds  the results may be better.
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
      Engagement: 1 likes, 0 reposts, 1 replies
      <replies>
        <post type="reply" uri="at://did:plc:mm6g3tgaumdqvfvlij526zz7/app.bsky.feed.post/3lmnxqcrla22q" bsky_url="https://bsky.app/profile/moni.fans/post/3lmnxqcrla22q" author_name="Moni 💋" author_handle="moni.fans" posted_at="4/12/2025, 7:09:28 PM">
          <content>
            in the two years of being on bluesky, ive never used the default feeds other than following, i much more enjoy a lot of the custom user made ones (toronto, biking, urbanism, science, news, trending), but i know my experience isnt standard and its a lot harder to get the bulk of users to use them
          </content>
          <reply_to uri="at://did:plc:mm6g3tgaumdqvfvlij526zz7/app.bsky.feed.post/3lmnxqcgpl22q"></reply_to>
          Engagement: 2 likes, 0 reposts, 0 replies
        </post>
      </replies>
    </post>
    <post type="reply" uri="at://did:plc:lyqbzqrzybjc2qqvcdgu3jry/app.bsky.feed.post/3lmmzx3mmr225" bsky_url="https://bsky.app/profile/ricardo-romo.com/post/3lmmzx3mmr225" author_name="Ricardo RR" author_handle="ricardo-romo.com" posted_at="4/12/2025, 10:16:17 AM">
      <content>
        Something I miss from twitter was that my worldviews got challenged daily. I don’t get any contrarian POVs in Bluesky.
(Yours is the first one I see in months I think)
Do you think feeds design could have something to do with this?
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
      Engagement: 3 likes, 0 reposts, 0 replies
    </post>
    <post type="reply" uri="at://did:plc:kpc5tukpvvbvy556u4ltdltl/app.bsky.feed.post/3lmnqqqhojs2n" bsky_url="https://bsky.app/profile/columk.bsky.social/post/3lmnqqqhojs2n" author_name="Colum Kelly" author_handle="columk.bsky.social" posted_at="4/12/2025, 5:04:19 PM">
      <content>
        My Discover page is all cute pets and nature photos no matter how many times I select &quot;see less of this&quot; on those posts. Something is definitely broken.
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
      Engagement: 8 likes, 0 reposts, 0 replies
    </post>
    <post type="reply" uri="at://did:plc:gsrapmnprr2snbxvszi56if6/app.bsky.feed.post/3lmn4pgedrc2f" bsky_url="https://bsky.app/profile/entrumpy.bsky.social/post/3lmn4pgedrc2f" author_name="Elijah Baley A1" author_handle="entrumpy.bsky.social" posted_at="4/12/2025, 11:05:42 AM">
      <content>
        Dan is still working
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
      Engagement: 2 likes, 0 reposts, 0 replies
    </post>
    <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum3hk2n" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmuyum3hk2n" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 8:47:49 AM">
      <content>
        i no longer work at bluesky so i feel a bit more open about my grievances (and if bluesky co isn&apos;t gonna solve it — which it eventually might! — i&apos;d like to see others try)
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
      Engagement: 132 likes, 4 reposts, 2 replies
      <replies>
        <post type="reply" uri="at://did:plc:opw3iapscc55nlgrx6q2yjah/app.bsky.feed.post/3lmmz4z6qsc2d" bsky_url="https://bsky.app/profile/beaussan.io/post/3lmmz4z6qsc2d" author_name="Nicolas Beaussart " author_handle="beaussan.io" posted_at="4/12/2025, 10:01:43 AM">
          <content>
            That&apos;s news to me! They were lucky to have you, where are you heading next?
          </content>
          <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum3hk2n"></reply_to>
          Engagement: 1 likes, 0 reposts, 0 replies
        </post>
        <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum4gs2n" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmuyum4gs2n" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 8:47:49 AM">
          <content>
            i think fundamentally &quot;feeds&quot; are a wrong abstraction. they conflate two very different competencies: curation and ranking
          </content>
          <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum3hk2n"></reply_to>
          Engagement: 144 likes, 3 reposts, 1 replies, 3 quotes
          <replies>
            <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum5g22n" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmuyum5g22n" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 8:47:49 AM">
              <content>
                1. curation

there&apos;s many models of curation. there can be exclusive curation like carefully newsletters. there can be &quot;small world&quot; curation like friends&apos; picks. and there can be &quot;large world&quot; curation like subreddits. but there&apos;s some human judgement in the loop in different forms
              </content>
              <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum4gs2n"></reply_to>
              Engagement: 111 likes, 1 reposts, 1 replies
              <replies>
                <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum6fc2n" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmuyum6fc2n" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 8:47:49 AM">
                  <content>
                    2. ranking

ranking is about the algorithm picking out the noise from the signal. it could be based on hotness (like HN or Reddit), some variation of &quot;top&quot; (like reddit &quot;top for this week&quot; mode), it could be friend-adjacent, or even basic &quot;latest&quot;.
                  </content>
                  <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum5g22n"></reply_to>
                  Engagement: 99 likes, 1 reposts, 1 replies, 1 quotes
                  <replies>
                    <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum6fd2n" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmuyum6fd2n" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 8:47:49 AM">
                      <content>
                        these things are completely different competencies!! there is absolutely no reason to expect good curators to implement their own ranking algorithms (that&apos;s ridiculous). there&apos;s also absolutely no reason that developers good at ranking stuff should be good at curation

&quot;feeds&quot; conflate the two
                      </content>
                      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum6fc2n"></reply_to>
                      Engagement: 130 likes, 7 reposts, 6 replies, 1 quotes
                      <replies>
                        <post type="reply" uri="at://did:plc:pjww3lv3ogt2fvnavri27xgm/app.bsky.feed.post/3lmpyhqgqsk2u" bsky_url="https://bsky.app/profile/ezraboeth.com/post/3lmpyhqgqsk2u" author_name="Ezra🦋" author_handle="ezraboeth.com" posted_at="4/13/2025, 2:27:49 PM">
                          <content>
                            one problem I see is that if a feed is going to both a curator then a ranker the time to generate the feed skeleton could be much longer. what if we could create pre-packaged &quot;black-box&quot; algorithms for curation and ranking, then feedgens import them both at runtime?
                          </content>
                          <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum6fd2n"></reply_to>
                          Engagement: 1 likes, 0 reposts, 3 replies
                          <replies>
                            <post type="reply" uri="at://did:plc:pjww3lv3ogt2fvnavri27xgm/app.bsky.feed.post/3lmpyiztifs2u" bsky_url="https://bsky.app/profile/ezraboeth.com/post/3lmpyiztifs2u" author_name="Ezra🦋" author_handle="ezraboeth.com" posted_at="4/13/2025, 2:28:33 PM">
                              <content>
                                oh oops this should say &quot;import them both at build time&quot;
                              </content>
                              <reply_to uri="at://did:plc:pjww3lv3ogt2fvnavri27xgm/app.bsky.feed.post/3lmpyhqgqsk2u"></reply_to>
                            </post>
                            <post type="reply" uri="at://did:plc:pjww3lv3ogt2fvnavri27xgm/app.bsky.feed.post/3lmpyhr5wyk2u" bsky_url="https://bsky.app/profile/ezraboeth.com/post/3lmpyhr5wyk2u" author_name="Ezra🦋" author_handle="ezraboeth.com" posted_at="4/13/2025, 2:27:49 PM">
                              <content>
                                also, many times the ranking choices you make are educated by the curation algorithm bc you have to know why a post made it into the feed in the first place to know &quot;how well the post fits the feed&quot;, so I&apos;m not sure you can decouple them
                              </content>
                              <reply_to uri="at://did:plc:pjww3lv3ogt2fvnavri27xgm/app.bsky.feed.post/3lmpyhqgqsk2u"></reply_to>
                            </post>
                            <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmqkpwasms2k" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmqkpwasms2k" author_name="dan" author_handle="danabra.mov" posted_at="4/13/2025, 7:54:32 PM">
                              <content>
                                oh i don’t think it should be pulled on demand. think of it as similar as reading the profile timeline — it’s already precomputed somewhere. same here; if Collections are non-personalized, that makes them cacheable across users. so you can cache a few common rankings (Top, New, etc) on AppView
                              </content>
                              <reply_to uri="at://did:plc:pjww3lv3ogt2fvnavri27xgm/app.bsky.feed.post/3lmpyhqgqsk2u"></reply_to>
                              Engagement: 3 likes, 0 reposts, 1 replies
                              <replies>
                                <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmql4lojsk2k" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmql4lojsk2k" author_name="dan" author_handle="danabra.mov" posted_at="4/13/2025, 8:01:36 PM">
                                  <content>
                                    so if you just want to browse a Collection with one of the common rankings, you just hit the AppView and it might even have it cached there already (so no need to hit the source — assuming the source is even modeled as a feedgen in the first place). similarly algos like Discover derive data from it
                                  </content>
                                  <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmqkpwasms2k"></reply_to>
                                  Engagement: 2 likes, 0 reposts, 0 replies
                                </post>
                              </replies>
                            </post>
                          </replies>
                        </post>
                        <post type="reply" uri="at://did:plc:ip3trmvdbnlm4g7cdc5xs7ub/app.bsky.feed.post/3lmn7mlbczs2g" bsky_url="https://bsky.app/profile/skillstopractice.com/post/3lmn7mlbczs2g" author_name="Gregory Brown" author_handle="skillstopractice.com" posted_at="4/12/2025, 11:57:46 AM">
                          <content>
                            This is 100% the issue I have in that most of the tooling that I have seen around feeds is actively hostile to curation (which is what I focus on) because the assumption is it&apos;s going to be algorithmically processed... 1 of 2
                          </content>
                          <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum6fd2n"></reply_to>
                          Engagement: 0 likes, 0 reposts, 1 replies
                          <replies>
                            <post type="reply" uri="at://did:plc:ip3trmvdbnlm4g7cdc5xs7ub/app.bsky.feed.post/3lmn7owrjfc2g" bsky_url="https://bsky.app/profile/skillstopractice.com/post/3lmn7owrjfc2g" author_name="Gregory Brown" author_handle="skillstopractice.com" posted_at="4/12/2025, 11:59:06 AM">
                              <content>
                                What would solve the problem for me entirely is if it were possible for people to pin an account in the same way they can a list or feed, then I would just run my &quot;feed&quot; by reposting from an alt account.

Oh wait... I can make a list with just one account on it that does exactly that... Hmmm....
                              </content>
                              <reply_to uri="at://did:plc:ip3trmvdbnlm4g7cdc5xs7ub/app.bsky.feed.post/3lmn7mlbczs2g"></reply_to>
                              Engagement: 0 likes, 0 reposts, 1 replies
                              <replies>
                                <post type="reply" uri="at://did:plc:ip3trmvdbnlm4g7cdc5xs7ub/app.bsky.feed.post/3lmnglsdgzs2t" bsky_url="https://bsky.app/profile/skillstopractice.com/post/3lmnglsdgzs2t" author_name="Gregory Brown" author_handle="skillstopractice.com" posted_at="4/12/2025, 2:02:39 PM">
                                  <content>
                                    Nope... that doesn&apos;t actually work because lists don&apos;t include reposts.

*sighs*
                                  </content>
                                  <reply_to uri="at://did:plc:ip3trmvdbnlm4g7cdc5xs7ub/app.bsky.feed.post/3lmn7owrjfc2g"></reply_to>
                                </post>
                              </replies>
                            </post>
                          </replies>
                        </post>
                        <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum7el2n" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmuyum7el2n" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 8:47:49 AM">
                          <content>
                            the problem with &quot;feeds&quot; is they&apos;re mostly junk content. that&apos;s because they&apos;re either bad at curation, or bad at ranking, or both. there&apos;s all kinds of userland conventions built on top of feeds, and some of *those* may eventually make sense. i think what needs to happen is decoupling of the two
                          </content>
                          <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum6fd2n"></reply_to>
                          Engagement: 147 likes, 8 reposts, 5 replies, 4 quotes
                          <replies>
                            <post type="reply" uri="at://did:plc:w75fzwl4ibla3witt3nk5oox/app.bsky.feed.post/3lmnzpqytes2p" bsky_url="https://bsky.app/profile/forthrast.bsky.social/post/3lmnzpqytes2p" author_name="Forth 🏝️" author_handle="forthrast.bsky.social" posted_at="4/12/2025, 7:44:52 PM">
                              <content>
                                anything less ordered than a news aggregator will be mostly junk content imo
                              </content>
                              <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum7el2n"></reply_to>
                            </post>
                            <post type="reply" uri="at://did:plc:hfgp6pj3akhqxntgqwramlbg/app.bsky.feed.post/3lmo5upbmdc2s" bsky_url="https://bsky.app/profile/blowdart.me/post/3lmo5upbmdc2s" author_name="Barry Dorrans" author_handle="blowdart.me" posted_at="4/12/2025, 8:59:12 PM">
                              <content>
                                I really did think I wanted a chronological timeline but now I realise I miss stuff I wanted to see and it would be a fallback for me, I want friend’s posts I haven’t seen up first.
                              </content>
                              <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum7el2n"></reply_to>
                              Engagement: 1 likes, 0 reposts, 0 replies
                            </post>
                            <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadt2n" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmuyumadt2n" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 8:47:49 AM">
                              <content>
                                one way this could look like is a different primitive that is more set-like (in a mathematical sense). like &quot;collections&quot;. you can add stuff to collections but they don&apos;t impose any ranking. they&apos;re more like profiles in that sense. completely predictable. and then *those things* could be ranked
                              </content>
                              <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum7el2n"></reply_to>
                              Engagement: 95 likes, 2 reposts, 6 replies, 3 quotes
                              <replies>
                                <post type="reply" uri="at://did:plc:ycacaebnhvkyptw7dna4ns2c/app.bsky.feed.post/3lmmxuczdvk2p" bsky_url="https://bsky.app/profile/sethfeldkamp.com/post/3lmmxuczdvk2p" author_name="Seth" author_handle="sethfeldkamp.com" posted_at="4/12/2025, 9:38:57 AM">
                                  <content>
                                    You are 100 percent right and let me give an example.  I host a sports team feed with Graze.  The curation is pretty dialed in, but the best I can do with ranking is a Hot rod ranking that blends in new posts.
                                  </content>
                                  <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadt2n"></reply_to>
                                  Engagement: 5 likes, 0 reposts, 1 replies
                                  <replies>
                                    <post type="reply" uri="at://did:plc:ycacaebnhvkyptw7dna4ns2c/app.bsky.feed.post/3lmmxudbfpk2p" bsky_url="https://bsky.app/profile/sethfeldkamp.com/post/3lmmxudbfpk2p" author_name="Seth" author_handle="sethfeldkamp.com" posted_at="4/12/2025, 9:38:57 AM">
                                      <content>
                                        Ideally a user could control their own ranking.  During games you want New probably.  In between games you want hot or top or something like that.  Reddit really gets this right, in my opinion.
                                      </content>
                                      <reply_to uri="at://did:plc:ycacaebnhvkyptw7dna4ns2c/app.bsky.feed.post/3lmmxuczdvk2p"></reply_to>
                                      Engagement: 5 likes, 0 reposts, 1 replies
                                      <replies>
                                        <post type="reply" uri="at://did:plc:ycacaebnhvkyptw7dna4ns2c/app.bsky.feed.post/3lmmxudbinc2p" bsky_url="https://bsky.app/profile/sethfeldkamp.com/post/3lmmxudbinc2p" author_name="Seth" author_handle="sethfeldkamp.com" posted_at="4/12/2025, 9:38:57 AM">
                                          <content>
                                            Sorry to hear you&apos;re no longer at Bluesky.  That&apos;s a loss for them and us.
                                          </content>
                                          <reply_to uri="at://did:plc:ycacaebnhvkyptw7dna4ns2c/app.bsky.feed.post/3lmmxudbfpk2p"></reply_to>
                                          Engagement: 3 likes, 0 reposts, 1 replies
                                        </post>
                                      </replies>
                                    </post>
                                  </replies>
                                </post>
                                <post type="reply,quote" uri="at://did:plc:sl5e4dhceock5r7f7ahnq4jm/app.bsky.feed.post/3lmn3ku7lds2z" bsky_url="https://bsky.app/profile/pevohr.bsky.social/post/3lmn3ku7lds2z" author_name="Paul Rohr" author_handle="pevohr.bsky.social" posted_at="4/12/2025, 10:45:13 AM">
                                  <content>
                                    yummy, yummy sets!
                                  </content>
                                  <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadt2n"></reply_to>
                                  <quoted_post uri="at://did:plc:sl5e4dhceock5r7f7ahnq4jm/app.bsky.feed.post/3knnz4icfi32b" bsky_url="https://bsky.app/profile/pevohr.bsky.social/post/3knnz4icfi32b" author_name="Paul Rohr" author_handle="pevohr.bsky.social" posted_at="3/14/2024, 7:33:04 AM">
                                    <content>
                                      How long before someone launches a service to perform set algebra on feeds? 

Given overlaps between:

A = Following
B = @why.bsky.team&apos;s Quiet Posters
C = @pfrazee.com&apos;s Discover 

I&apos;d love to be able to browse:

A - B ~= Noisy posters
C - A ~= Recommended 
A ∩ C ~= Likely bangers

#LazySky
                                    </content>
                                    Engagement: 5 likes, 0 reposts, 2 replies, 3 quotes
                                  </quoted_post>
                                  Engagement: 4 likes, 0 reposts, 0 replies
                                </post>
                                <post type="reply" uri="at://did:plc:fxnw2wkzf23zya6shq4pxvh6/app.bsky.feed.post/3lmmzqh64ke2x" bsky_url="https://bsky.app/profile/aeshna-cyanea.bsky.social/post/3lmmzqh64ke2x" author_name="Autumn" author_handle="aeshna-cyanea.bsky.social" posted_at="4/12/2025, 10:12:35 AM">
                                  <content>
                                    Ok this may sound insane but &quot;collections&quot; are already an atproto concept, and lexicons have a built in namespace hierarchy.

 What are the drawbacks of just storing posts (meant to be included in feeds) in specially named repo collections under a parent namespace in your repo
                                  </content>
                                  <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadt2n"></reply_to>
                                  Engagement: 2 likes, 0 reposts, 1 replies, 1 quotes
                                  <replies>
                                    <post type="reply" uri="at://did:plc:5qtf47soyj3stuno5vknxfb6/app.bsky.feed.post/3lmnjsx6cm226" bsky_url="https://bsky.app/profile/natanael.bsky.social/post/3lmnjsx6cm226" author_name="Natanael, Tech janitor" author_handle="natanael.bsky.social" posted_at="4/12/2025, 3:00:20 PM">
                                      <content>
                                        Or including hints in the posts to be used by labelers, and then feed generators can pull from their indexes (including published derived metadata) and apply rankings on the relevant posts
                                      </content>
                                      <reply_to uri="at://did:plc:fxnw2wkzf23zya6shq4pxvh6/app.bsky.feed.post/3lmmzqh64ke2x"></reply_to>
                                      Engagement: 1 likes, 0 reposts, 0 replies
                                    </post>
                                  </replies>
                                </post>
                                <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadu2n" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmuyumadu2n" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 8:47:49 AM">
                                  <content>
                                    if bluesky itself is not building this right now, then i think somebody else should. the thing that makes or breaks the platform is the content. twitter &quot;communities&quot; are not good because they act more like folders than tags. there&apos;s a real opportunity here imo and it&apos;s worth prototyping
                                  </content>
                                  <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadt2n"></reply_to>
                                  Engagement: 124 likes, 9 reposts, 2 replies
                                  <replies>
                                    <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadv2n" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmuyumadv2n" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 8:47:49 AM">
                                      <content>
                                        (if only to force bluesky to make a move on this sooner)
                                      </content>
                                      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadu2n"></reply_to>
                                      Engagement: 73 likes, 1 reposts, 8 replies
                                      <replies>
                                        <post type="reply" uri="at://did:plc:uu5axsmbm2or2dngy4gwchec/app.bsky.feed.post/3lmmv6hwp7c2t" bsky_url="https://bsky.app/profile/futur.blue/post/3lmmv6hwp7c2t" author_name="futur" author_handle="futur.blue" posted_at="4/12/2025, 8:50:57 AM">
                                          <content>
                                            yeeessss

I think two of the ideas dropped pretty early on (scenes &amp; per-profile outline hashtag filtering) would together tie into this pretty well

stuff needs to belong somewhere — open data lake is fine at the appview level, becomes more awkward as it becomes more granular
                                          </content>
                                          <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadv2n"></reply_to>
                                          Engagement: 24 likes, 0 reposts, 1 replies
                                        </post>
                                        <post type="reply" uri="at://did:plc:prkxfnkgdvs6y6vzvuuckqqt/app.bsky.feed.post/3lmmvrbvif22o" bsky_url="https://bsky.app/profile/ordinaryrabbit.bsky.social/post/3lmmvrbvif22o" author_name="Ordinary Rabbit" author_handle="ordinaryrabbit.bsky.social" posted_at="4/12/2025, 9:01:30 AM">
                                          <content>
                                            i once conceived of a social media that used spheres instead of top to bottom feeds, and people could engage in a multimedia way so they could write text or upload a voice text or video, 

So it would all kinda break free from text-video top to bottom

Not sure if spheres solve curation-ranking tho
                                          </content>
                                          <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadv2n"></reply_to>
                                          Engagement: 1 likes, 0 reposts, 0 replies
                                        </post>
                                        <post type="reply" uri="at://did:plc:j6e5hwy2rtkx4mxx4ohdgmv2/app.bsky.feed.post/3lmmvatxdwk22" bsky_url="https://bsky.app/profile/dan-oak.dev/post/3lmmvatxdwk22" author_name="Dan Oak" author_handle="dan-oak.dev" posted_at="4/12/2025, 8:52:18 AM">
                                          <content>
                                            Do you think changing the feed feature is what will bring more people to blue sky? I thought most of the users here were just pissed off with seeing Elon bastardise the twitter that we once loved and needed a new home as twitter refugees
                                          </content>
                                          <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadv2n"></reply_to>
                                          Engagement: 7 likes, 0 reposts, 2 replies
                                        </post>
                                        <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmvopbxmc2k" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmvopbxmc2k" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 9:00:05 AM">
                                          <content>
                                            i know this is def something the team is thinking about. but i think there’s probably also quite a bit of hesitancy to mess with something that works. to which i would reply — it doesn’t fucking work. it’s ok to mess with it
                                          </content>
                                          <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadv2n"></reply_to>
                                          Engagement: 104 likes, 0 reposts, 3 replies
                                        </post>
                                        <post type="reply" uri="at://did:plc:echizhaaqev7ver7l6acqbug/app.bsky.feed.post/3lmp2wwhnvc2a" bsky_url="https://bsky.app/profile/riolindamex.bsky.social/post/3lmp2wwhnvc2a" author_name="RIO LINDA MEX 🇺🇸🇲🇽🇨🇦🦍" author_handle="riolindamex.bsky.social" posted_at="4/13/2025, 5:39:28 AM">
                                          <content>
                                            
                                          </content>
                                          <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadv2n"></reply_to>
                                          <embed type="link">
                                            Title: "a monkey is sitting on a rock in the woods and looking at something ."
                                            URL: https://media.tenor.com/VOuZA06iyJcAAAAC/viyeongg-bored-monkey.gif?hh=498&ww=329
                                            Description: "ALT: a monkey is sitting on a rock in the woods and looking at something ."
                                            Thumbnail: https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:echizhaaqev7ver7l6acqbug/bafkreigqykhejnnq45imm3ho2x6r7ohg5d26gvsaswi5vznsjrjprctukm@jpeg
                                          </embed>
                                        </post>
                                        <post type="reply" uri="at://did:plc:echizhaaqev7ver7l6acqbug/app.bsky.feed.post/3lmp2w76n322a" bsky_url="https://bsky.app/profile/riolindamex.bsky.social/post/3lmp2w76n322a" author_name="RIO LINDA MEX 🇺🇸🇲🇽🇨🇦🦍" author_handle="riolindamex.bsky.social" posted_at="4/13/2025, 5:39:03 AM">
                                          <content>
                                            
                                          </content>
                                          <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadv2n"></reply_to>
                                          <embed type="link">
                                            Title: "a little girl is laying on an office chair"
                                            URL: https://media.tenor.com/DqVSB4Tikr4AAAAC/bored-and.gif?hh=498&ww=373
                                            Description: "ALT: a little girl is laying on an office chair"
                                            Thumbnail: https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:echizhaaqev7ver7l6acqbug/bafkreidanf7ez7qdlmo6b4hgoarrsfujowikj4z3jksl23brhprwp6nno4@jpeg
                                          </embed>
                                        </post>
                                        <post type="reply" uri="at://did:plc:echizhaaqev7ver7l6acqbug/app.bsky.feed.post/3lmp2vop56s2a" bsky_url="https://bsky.app/profile/riolindamex.bsky.social/post/3lmp2vop56s2a" author_name="RIO LINDA MEX 🇺🇸🇲🇽🇨🇦🦍" author_handle="riolindamex.bsky.social" posted_at="4/13/2025, 5:38:45 AM">
                                          <content>
                                            
                                          </content>
                                          <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadv2n"></reply_to>
                                          <embed type="link">
                                            Title: "a chimpanzee is laying on a couch and pointing at a piece of paper"
                                            URL: https://media.tenor.com/yxGoYdNazpsAAAAC/stan-twitter-monkey.gif?hh=498&ww=498
                                            Description: "ALT: a chimpanzee is laying on a couch and pointing at a piece of paper"
                                            Thumbnail: https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:echizhaaqev7ver7l6acqbug/bafkreiamla25c3j6gvqiss64goxjwz6rkn6w36jj3646ixg2cqyvlb5ahu@jpeg
                                          </embed>
                                        </post>
                                      </replies>
                                    </post>
                                    <post type="reply" uri="at://did:plc:3ovlqkndffifdbmfblxnfymz/app.bsky.feed.post/3lmmvvhumuc23" bsky_url="https://bsky.app/profile/mikestaub.social/post/3lmmvvhumuc23" author_name="Mike Staub 🐝" author_handle="mikestaub.social" posted_at="4/12/2025, 9:03:48 AM">
                                      <content>
                                        100% they should be decoupled. This way feed authors can share ranking algorithms. I would put this kind of tech debt in the not urgent but important quadrant.
                                      </content>
                                      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadu2n"></reply_to>
                                      Engagement: 4 likes, 0 reposts, 0 replies
                                    </post>
                                  </replies>
                                </post>
                                <post type="reply" uri="at://did:plc:5qtf47soyj3stuno5vknxfb6/app.bsky.feed.post/3lmnj7j2kqs26" bsky_url="https://bsky.app/profile/natanael.bsky.social/post/3lmnj7j2kqs26" author_name="Natanael, Tech janitor" author_handle="natanael.bsky.social" posted_at="4/12/2025, 2:49:29 PM">
                                  <content>
                                    That could be built on top of content and community based labelers, allowing feeds to quickly collect what&apos;s relevant without needing its own methods of identifying relevant posts, then applying rankings on top of that
                                  </content>
                                  <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadt2n"></reply_to>
                                </post>
                                <post type="reply" uri="at://did:plc:2zxlmj2dvub7smpul2lvwqfk/app.bsky.feed.post/3lmotue32l225" bsky_url="https://bsky.app/profile/mathewlowry.bsky.social/post/3lmotue32l225" author_name="Mathew Lowry" author_handle="mathewlowry.bsky.social" posted_at="4/13/2025, 3:32:43 AM">
                                  <content>
                                    Fwiw, each visitor to a Hub can create a near-infinite set of collections of its content by combining tags &amp; type (like/think/do) - eg myhub.ai/@mathewlowry...

Each has its own RSS feed, but resources are currently presented reverse chrono. Maybe I should provide other sort options. Thoughts?
                                  </content>
                                  <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyumadt2n"></reply_to>
                                </post>
                              </replies>
                            </post>
                            <post type="reply" uri="at://did:plc:dbulwkpel5g7wql2tyfmifcc/app.bsky.feed.post/3lmmvh2rmpc25" bsky_url="https://bsky.app/profile/cmpell.bsky.social/post/3lmmvh2rmpc25" author_name="Valentino &amp; auntchristine" author_handle="cmpell.bsky.social" posted_at="4/12/2025, 8:55:45 AM">
                              <content>
                                I sincerely hate feeds.  Give me the old Shitter format. I prefer a reverse chrono timeline and maybe only an additional &quot;Following&quot; (accounts not topics) feed with great hashtag searching &amp; Trending.. I bet public figures, city &amp; state agencies &amp; news sources prefer it also.
                              </content>
                              <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum7el2n"></reply_to>
                              Engagement: 4 likes, 0 reposts, 0 replies
                            </post>
                          </replies>
                        </post>
                        <post type="reply" uri="at://did:plc:f5vv2f7a4huhkcqy6b4fp5ge/app.bsky.feed.post/3lmmvsaubhk2r" bsky_url="https://bsky.app/profile/notwes.bsky.social/post/3lmmvsaubhk2r" author_name="Wes" author_handle="notwes.bsky.social" posted_at="4/12/2025, 9:02:00 AM">
                          <content>
                            Maybe I’m wrong, but isn’t there some combination of lists for curation and feeds for ranking that might work to resolve this?

Frankly, for me, I don’t see this is a problem in today’s world because none of the existing social media platforms are any closer than Bluesky on this.
                          </content>
                          <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum6fd2n"></reply_to>
                          Engagement: 1 likes, 0 reposts, 0 replies
                        </post>
                        <post type="reply" uri="at://did:plc:aqruc5s232xvzvuoqalnjn2v/app.bsky.feed.post/3lmmwfemsok2j" bsky_url="https://bsky.app/profile/pippa.cool/post/3lmmwfemsok2j" author_name="Pippa 🦋 " author_handle="pippa.cool" posted_at="4/12/2025, 9:12:42 AM">
                          <content>
                            i dont 100% disagree with you but I think the set up right now is an interesting reason for learning and collaboration.
                          </content>
                          <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum6fd2n"></reply_to>
                        </post>
                        <post type="reply" uri="at://did:plc:7mnpet2pvof2llhpcwattscf/app.bsky.feed.post/3lmmvvoawx22v" bsky_url="https://bsky.app/profile/piss.beauty/post/3lmmvvoawx22v" author_name="stellz" author_handle="piss.beauty" posted_at="4/12/2025, 9:03:53 AM">
                          <content>
                            what about a feed implies ranking? I&apos;ve never gone to a feed expecting a ranked order of posts
                          </content>
                          <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyum6fd2n"></reply_to>
                          Engagement: 15 likes, 0 reposts, 3 replies
                          <replies>
                            <post type="reply" uri="at://did:plc:mdjhvva6vlrswsj26cftjttd/app.bsky.feed.post/3lmn7nnwqyc2p" bsky_url="https://bsky.app/profile/laurenshof.online/post/3lmn7nnwqyc2p" author_name="Laurens" author_handle="laurenshof.online" posted_at="4/12/2025, 11:58:24 AM">
                              <content>
                                most of my feed usage is not ranked, and for that i think your description of scrolling as a moving camera works well. but i do have some feeds which i did deliberately rank, and it is a very different type of experience of using those feeds. i wish the system facilitated feed ranking better
                              </content>
                              <reply_to uri="at://did:plc:7mnpet2pvof2llhpcwattscf/app.bsky.feed.post/3lmmvvoawx22v"></reply_to>
                              Engagement: 3 likes, 0 reposts, 0 replies
                            </post>
                            <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmwdudhj222" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmwdudhj222" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 9:11:52 AM">
                              <content>
                                oh i just mean the fact that the feed generator makes a decision about the order. which is usually &apos;latest&apos; but could be something else. in my opinion the thing that acts as a curation mechanism should not be making these decisions at all
                              </content>
                              <reply_to uri="at://did:plc:7mnpet2pvof2llhpcwattscf/app.bsky.feed.post/3lmmvvoawx22v"></reply_to>
                              Engagement: 12 likes, 0 reposts, 1 replies
                              <replies>
                                <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmwfni53k22" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmwfni53k22" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 9:12:52 AM">
                                  <content>
                                    i.e. if i subscribe to an &quot;adhd feed&quot; on skyfeed, i find it ridiculous that content filtering (matching for adhd-related content) and content ranking (whatever skyfeed is doing to choose the ordering) are performed by the same entity. as a user i don&apos;t want this at all!
                                  </content>
                                  <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmwdudhj222"></reply_to>
                                  Engagement: 10 likes, 0 reposts, 3 replies
                                  <replies>
                                    <post type="reply" uri="at://did:plc:uu5axsmbm2or2dngy4gwchec/app.bsky.feed.post/3lmmwhf6q2k2c" bsky_url="https://bsky.app/profile/futur.blue/post/3lmmwhf6q2k2c" author_name="futur" author_handle="futur.blue" posted_at="4/12/2025, 9:13:49 AM">
                                      <content>
                                        expecting a feedgen to know every uri it possibly intends to serve ahead of time is not necessarily practical either though
                                      </content>
                                      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmwfni53k22"></reply_to>
                                      Engagement: 5 likes, 0 reposts, 1 replies
                                      <replies>
                                        <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmwjz33hs22" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmwjz33hs22" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 9:15:18 AM">
                                          <content>
                                            in my head these feedgens are just sets. kind of like profiles. the ranking is done at a layer consuming from it
                                          </content>
                                          <reply_to uri="at://did:plc:uu5axsmbm2or2dngy4gwchec/app.bsky.feed.post/3lmmwhf6q2k2c"></reply_to>
                                          Engagement: 4 likes, 0 reposts, 1 replies
                                        </post>
                                      </replies>
                                    </post>
                                    <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmwinapik22" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmwinapik22" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 9:14:32 AM">
                                      <content>
                                        what i want is closer to a reddit model. where there&apos;s a hub for people to manually submit stuff (and maybe some stuff does get pulled in automatically). and there&apos;s a few algorithmic &quot;views&quot; of that content (latest, top, hot, whatever). and i don&apos;t want skyfeed to be responsible for those &quot;views&quot;
                                      </content>
                                      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmwfni53k22"></reply_to>
                                      Engagement: 13 likes, 1 reposts, 1 replies
                                      <replies>
                                        <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmwncdkic22" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmwncdkic22" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 9:17:08 AM">
                                          <content>
                                            the &quot;views&quot; imo are an appview concern. cache them across all users as an optimization. Discover and such should be aware of my &quot;sets&quot; so they can act as &quot;views&quot; too. basically imagine &quot;sets&quot; are like profiles. ofc Discover and such can use that information, just like they know who i follow
                                          </content>
                                          <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmwinapik22"></reply_to>
                                          Engagement: 8 likes, 0 reposts, 1 replies
                                        </post>
                                      </replies>
                                    </post>
                                    <post type="reply" uri="at://did:plc:7mnpet2pvof2llhpcwattscf/app.bsky.feed.post/3lmmwso5ow22v" bsky_url="https://bsky.app/profile/piss.beauty/post/3lmmwso5ow22v" author_name="stellz" author_handle="piss.beauty" posted_at="4/12/2025, 9:20:06 AM">
                                      <content>
                                        the difference is I think the mental model of ordering

to me, feeds are not ranked. they are a landscape I pan across by scrolling down 

ordering of this stuff is a requirement imposed by the form factor of screens and human senses rather than a semantic axis. scrolling is moving a camera
                                      </content>
                                      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmwfni53k22"></reply_to>
                                      Engagement: 14 likes, 0 reposts, 1 replies
                                      <replies>
                                        <post type="reply" uri="at://did:plc:7mnpet2pvof2llhpcwattscf/app.bsky.feed.post/3lmmwxatf5s2v" bsky_url="https://bsky.app/profile/piss.beauty/post/3lmmwxatf5s2v" author_name="stellz" author_handle="piss.beauty" posted_at="4/12/2025, 9:22:40 AM">
                                          <content>
                                            I was thinking about this with pagination recently

the need to paginate data in my API responses actually _imposes_ a need for total ordering on a dataset that didn&apos;t previously have it. no order, no consistent pages.

it&apos;s the same with feeds. you need to be able to get paginated posts
                                          </content>
                                          <reply_to uri="at://did:plc:7mnpet2pvof2llhpcwattscf/app.bsky.feed.post/3lmmwso5ow22v"></reply_to>
                                          Engagement: 20 likes, 1 reposts, 0 replies, 1 quotes
                                        </post>
                                      </replies>
                                    </post>
                                  </replies>
                                </post>
                              </replies>
                            </post>
                            <post type="reply" uri="at://did:plc:7ixolzataqsaxfm2ams6zrg6/app.bsky.feed.post/3lmmvxxhkss2y" bsky_url="https://bsky.app/profile/valkyrie.hacker.gf/post/3lmmvxxhkss2y" author_name="Andrea" author_handle="valkyrie.hacker.gf" posted_at="4/12/2025, 9:05:12 AM">
                              <content>
                                a feed generator is certainly making both a selection of content and an ordering in which to return it
                              </content>
                              <reply_to uri="at://did:plc:7mnpet2pvof2llhpcwattscf/app.bsky.feed.post/3lmmvvoawx22v"></reply_to>
                              Engagement: 9 likes, 0 reposts, 2 replies
                              <replies>
                                <post type="reply" uri="at://did:plc:rqm4qgf6jdmb35mxatuzi6cq/app.bsky.feed.post/3lmmvzrpffc2h" bsky_url="https://bsky.app/profile/jamesmunns.com/post/3lmmvzrpffc2h" author_name="James Munns" author_handle="jamesmunns.com" posted_at="4/12/2025, 9:06:13 AM">
                                  <content>
                                    Yeah, I feel like the Discover feed is a prime example of this
                                  </content>
                                  <reply_to uri="at://did:plc:7ixolzataqsaxfm2ams6zrg6/app.bsky.feed.post/3lmmvxxhkss2y"></reply_to>
                                  Engagement: 3 likes, 0 reposts, 0 replies
                                </post>
                                <post type="reply" uri="at://did:plc:7mnpet2pvof2llhpcwattscf/app.bsky.feed.post/3lmmw6vhmvc2v" bsky_url="https://bsky.app/profile/piss.beauty/post/3lmmw6vhmvc2v" author_name="stellz" author_handle="piss.beauty" posted_at="4/12/2025, 9:09:05 AM">
                                  <content>
                                    order doesn&apos;t imply meaning. scroll is just scroll because of the form factor
                                  </content>
                                  <reply_to uri="at://did:plc:7ixolzataqsaxfm2ams6zrg6/app.bsky.feed.post/3lmmvxxhkss2y"></reply_to>
                                  Engagement: 9 likes, 0 reposts, 1 replies
                                  <replies>
                                    <post type="reply" uri="at://did:plc:7ixolzataqsaxfm2ams6zrg6/app.bsky.feed.post/3lmmwbrelak2g" bsky_url="https://bsky.app/profile/valkyrie.hacker.gf/post/3lmmwbrelak2g" author_name="Andrea" author_handle="valkyrie.hacker.gf" posted_at="4/12/2025, 9:10:41 AM">
                                      <content>
                                        it&apos;s still determined by the feed generator, which could have made n! other choices
                                      </content>
                                      <reply_to uri="at://did:plc:7mnpet2pvof2llhpcwattscf/app.bsky.feed.post/3lmmw6vhmvc2v"></reply_to>
                                      Engagement: 5 likes, 0 reposts, 0 replies
                                    </post>
                                  </replies>
                                </post>
                              </replies>
                            </post>
                          </replies>
                        </post>
                      </replies>
                    </post>
                  </replies>
                </post>
              </replies>
            </post>
          </replies>
        </post>
      </replies>
    </post>
    <post type="reply" uri="at://did:plc:cjinybngj7dlvspewakwjab2/app.bsky.feed.post/3lmocqovhbk2d" bsky_url="https://bsky.app/profile/mindplay.dk/post/3lmocqovhbk2d" author_name="Rasmus Schultz" author_handle="mindplay.dk" posted_at="4/12/2025, 10:26:28 PM">
      <content>
        draw your own conclusions but your post was top in this feed 💁‍♂️
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
      <embed type="image">
        URL: https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:cjinybngj7dlvspewakwjab2/bafkreifzxnh2qja5de6hgreebrecwivsulhybvdaqm42bu7lrukpgbc7le@jpeg
      </embed>
      Engagement: 21 likes, 1 reposts, 1 replies
      <replies>
        <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmodqumwk223" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmodqumwk223" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 10:44:26 PM">
          <content>
            that&apos;s good :)
          </content>
          <reply_to uri="at://did:plc:cjinybngj7dlvspewakwjab2/app.bsky.feed.post/3lmocqovhbk2d"></reply_to>
          Engagement: 5 likes, 0 reposts, 0 replies
        </post>
      </replies>
    </post>
    <post type="reply" uri="at://did:plc:5w4eqcxzw5jv5qfnmzxcakfy/app.bsky.feed.post/3lmmw4sidwk2v" bsky_url="https://bsky.app/profile/thisismissem.bsky.social/post/3lmmw4sidwk2v" author_name="Emelia" author_handle="thisismissem.bsky.social" posted_at="4/12/2025, 9:07:54 AM">
      <content>
        (Have read the thread)

Would a tool like graze help? Using lists from people to provide curation, whilst the feed focuses on ranking?
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
      Engagement: 13 likes, 0 reposts, 3 replies
      <replies>
        <post type="reply" uri="at://did:plc:kkf4naxqmweop7dv4l2iqqf5/app.bsky.feed.post/3lmmxwxrzks2j" bsky_url="https://bsky.app/profile/aendra.com/post/3lmmxwxrzks2j" author_name="ændra." author_handle="aendra.com" posted_at="4/12/2025, 9:40:25 AM">
          <content>
            This has definitely been my experience with Graze, it lets me focus on curation while leaving the infra and sorting stuff to someone else, much moreso than when I was running my own infra because I now also get stats as well as the ability to add/remove individual posts from feeds.
          </content>
          <reply_to uri="at://did:plc:5w4eqcxzw5jv5qfnmzxcakfy/app.bsky.feed.post/3lmmw4sidwk2v"></reply_to>
          Engagement: 12 likes, 0 reposts, 1 replies
          <replies>
            <post type="reply" uri="at://did:plc:kkf4naxqmweop7dv4l2iqqf5/app.bsky.feed.post/3lmmyvbxho22j" bsky_url="https://bsky.app/profile/aendra.com/post/3lmmyvbxho22j" author_name="ændra." author_handle="aendra.com" posted_at="4/12/2025, 9:57:23 AM">
              <content>
                It&apos;s also really opened up what I can do with sorting because it provides so much signal versus when I was running my own firehose consumer. The other night someone was moaning about  Trending News having a lot of stale news, so I edited the sorting algo, from my phone in the bathtub, in &lt;5 minutes.
              </content>
              <reply_to uri="at://did:plc:kkf4naxqmweop7dv4l2iqqf5/app.bsky.feed.post/3lmmxwxrzks2j"></reply_to>
              Engagement: 9 likes, 0 reposts, 0 replies
            </post>
          </replies>
        </post>
        <post type="reply" uri="at://did:plc:jijwtzgroy76samnivlqrpec/app.bsky.feed.post/3lmmzb4xdhk2c" bsky_url="https://bsky.app/profile/devingaffney.com/post/3lmmzb4xdhk2c" author_name="Devin Gaffney" author_handle="devingaffney.com" posted_at="4/12/2025, 10:04:05 AM">
          <content>
            FWIW we are actively pairing up with folks to nail ranking and recommendation engines. We have a great opportunity to pair with researchers to experimentally design rankings that optimize for user needs rather than platform exploits and open source that work- a top priority for us
          </content>
          <reply_to uri="at://did:plc:5w4eqcxzw5jv5qfnmzxcakfy/app.bsky.feed.post/3lmmw4sidwk2v"></reply_to>
          Engagement: 8 likes, 0 reposts, 0 replies
        </post>
        <post type="reply" uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmwaqccyc22" bsky_url="https://bsky.app/profile/danabra.mov/post/3lmmwaqccyc22" author_name="dan" author_handle="danabra.mov" posted_at="4/12/2025, 9:10:07 AM">
          <content>
            i think that’s probably the happiest userland way to go about it. i wish there were first-party primitives to fully embrace this approach but in the meantime it definitely helps
          </content>
          <reply_to uri="at://did:plc:5w4eqcxzw5jv5qfnmzxcakfy/app.bsky.feed.post/3lmmw4sidwk2v"></reply_to>
          Engagement: 6 likes, 0 reposts, 1 replies
          <replies>
            <post type="reply" uri="at://did:plc:5w4eqcxzw5jv5qfnmzxcakfy/app.bsky.feed.post/3lmmwdpajnc2v" bsky_url="https://bsky.app/profile/thisismissem.bsky.social/post/3lmmwdpajnc2v" author_name="Emelia" author_handle="thisismissem.bsky.social" posted_at="4/12/2025, 9:11:46 AM">
              <content>
                Arguably graze could also have more human centred curation tools, like a client app geared towards curation.

tbh, I fully expect Bluesky to buy Graze
              </content>
              <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmwaqccyc22"></reply_to>
              Engagement: 7 likes, 0 reposts, 1 replies
              <replies>
                <post type="reply" uri="at://did:plc:jijwtzgroy76samnivlqrpec/app.bsky.feed.post/3lmmyuqo3ns2c" bsky_url="https://bsky.app/profile/devingaffney.com/post/3lmmyuqo3ns2c" author_name="Devin Gaffney" author_handle="devingaffney.com" posted_at="4/12/2025, 9:57:05 AM">
                  <content>
                    👀
                  </content>
                  <reply_to uri="at://did:plc:5w4eqcxzw5jv5qfnmzxcakfy/app.bsky.feed.post/3lmmwdpajnc2v"></reply_to>
                  Engagement: 1 likes, 0 reposts, 0 replies
                </post>
              </replies>
            </post>
          </replies>
        </post>
      </replies>
    </post>
    <post type="reply" uri="at://did:plc:5dnwnjydruv7wmbi33xchkr6/app.bsky.feed.post/3lmmxnjoj7k2z" bsky_url="https://bsky.app/profile/nate.rip/post/3lmmxnjoj7k2z" author_name="Nate Butler" author_handle="nate.rip" posted_at="4/12/2025, 9:35:09 AM">
      <content>
        (maybe?) Interestingly – like you say, feeds are less sticky, you will never hit fb/ig/tiktok levels of engagement with them, but at the same time I really LIKE the slower pace/lower volume, or even lower quality of the content at times.

I&apos;ve been trying to reduce the amount I intake social...
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
      Engagement: 12 likes, 0 reposts, 1 replies
      <replies>
        <post type="reply" uri="at://did:plc:5dnwnjydruv7wmbi33xchkr6/app.bsky.feed.post/3lmmxnjqqis2z" bsky_url="https://bsky.app/profile/nate.rip/post/3lmmxnjqqis2z" author_name="Nate Butler" author_handle="nate.rip" posted_at="4/12/2025, 9:35:09 AM">
          <content>
            media and it is really nice to hit &quot;oh, I&apos;ve already seen this&quot; or &quot;I guess I&apos;m out of content&quot; vs the constantly changing, never ending content of most platforms. It tips my brain off it&apos;s time to stop/I&apos;ve been consuming too much today.

Does it make sense from a business perspective? No...
          </content>
          <reply_to uri="at://did:plc:5dnwnjydruv7wmbi33xchkr6/app.bsky.feed.post/3lmmxnjoj7k2z"></reply_to>
          Engagement: 12 likes, 0 reposts, 1 replies
          <replies>
            <post type="reply" uri="at://did:plc:5dnwnjydruv7wmbi33xchkr6/app.bsky.feed.post/3lmmxnjqri22z" bsky_url="https://bsky.app/profile/nate.rip/post/3lmmxnjqri22z" author_name="Nate Butler" author_handle="nate.rip" posted_at="4/12/2025, 9:35:09 AM">
              <content>
                but from a social health perspective? Maybe?

Idk, I feel like the thing that stuck with me the most leaving FB after being on feed for quite a while was IMO people weren&apos;t meant to be exposed to numbers as big as social media exposes us to constantly.

I guess that is why I like the slower feeds
              </content>
              <reply_to uri="at://did:plc:5dnwnjydruv7wmbi33xchkr6/app.bsky.feed.post/3lmmxnjqqis2z"></reply_to>
              Engagement: 11 likes, 0 reposts, 1 replies
              <replies>
                <post type="reply" uri="at://did:plc:yrduw3papswktykngj6ccpci/app.bsky.feed.post/3lmofji7oyk2d" bsky_url="https://bsky.app/profile/missharpylady.bsky.social/post/3lmofji7oyk2d" author_name="Ms. HarpyLady" author_handle="missharpylady.bsky.social" posted_at="4/12/2025, 11:16:06 PM">
                  <content>
                    Im down for a system that rewards a slower cadence. Something akin to the feeling of cultivating a seed, and checking on it every now and then and see how it’s grown.

This implies going against the norm of employing dopaminergic hooks to maintain engagement, but it addiction should not be the goal.
                  </content>
                  <reply_to uri="at://did:plc:5dnwnjydruv7wmbi33xchkr6/app.bsky.feed.post/3lmmxnjqri22z"></reply_to>
                  Engagement: 1 likes, 0 reposts, 1 replies
                  <replies>
                    <post type="reply" uri="at://did:plc:yrduw3papswktykngj6ccpci/app.bsky.feed.post/3lmofkw5ec22d" bsky_url="https://bsky.app/profile/missharpylady.bsky.social/post/3lmofkw5ec22d" author_name="Ms. HarpyLady" author_handle="missharpylady.bsky.social" posted_at="4/12/2025, 11:16:54 PM">
                      <content>
                        Sorry, I’m talking as if I had a sway in this. This is only my genuine sentiment; just something I wanted to share.
                      </content>
                      <reply_to uri="at://did:plc:yrduw3papswktykngj6ccpci/app.bsky.feed.post/3lmofji7oyk2d"></reply_to>
                      Engagement: 1 likes, 0 reposts, 0 replies
                    </post>
                  </replies>
                </post>
              </replies>
            </post>
          </replies>
        </post>
      </replies>
    </post>
    <post type="reply" uri="at://did:plc:4q35tibc2dwdefnxrspnvm65/app.bsky.feed.post/3lmnh6kv3us2e" bsky_url="https://bsky.app/profile/techmag.bsky.social/post/3lmnh6kv3us2e" author_name="Gary Hewett 🇨🇦" author_handle="techmag.bsky.social" posted_at="4/12/2025, 2:13:08 PM">
      <content>
        I’ve never liked feeds either — they promote disposable content — wanna win? Flood the feed 

To me a feed is akin to a log and a log is about an entity — feeds in SM do not have much “entity” as they are all “log” 

Your curated Sets allude to those part(s) that might be missing
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
      Engagement: 2 likes, 0 reposts, 2 replies
      <replies>
        <post type="reply" uri="at://did:plc:4q35tibc2dwdefnxrspnvm65/app.bsky.feed.post/3lmnhel2adk2e" bsky_url="https://bsky.app/profile/techmag.bsky.social/post/3lmnhel2adk2e" author_name="Gary Hewett 🇨🇦" author_handle="techmag.bsky.social" posted_at="4/12/2025, 2:16:29 PM">
          <content>
            Until of course someone does it 😎
          </content>
          <reply_to uri="at://did:plc:4q35tibc2dwdefnxrspnvm65/app.bsky.feed.post/3lmnh6kv3us2e"></reply_to>
        </post>
        <post type="reply" uri="at://did:plc:4q35tibc2dwdefnxrspnvm65/app.bsky.feed.post/3lmnhe4ktac2e" bsky_url="https://bsky.app/profile/techmag.bsky.social/post/3lmnhe4ktac2e" author_name="Gary Hewett 🇨🇦" author_handle="techmag.bsky.social" posted_at="4/12/2025, 2:16:14 PM">
          <content>
            Can we build something on such a way that effort is rewarded long term as opposed to of it don’t take off in the first 5 mins then it’ll never go anywhere 

Given how open the AT proto is the lay might be doable outside of official BS channels of course 

Hard to envision what that might look like 👀
          </content>
          <reply_to uri="at://did:plc:4q35tibc2dwdefnxrspnvm65/app.bsky.feed.post/3lmnh6kv3us2e"></reply_to>
          Engagement: 1 likes, 0 reposts, 1 replies
          <replies>
            <post type="reply" uri="at://did:plc:yrduw3papswktykngj6ccpci/app.bsky.feed.post/3lmofaq3y4s2d" bsky_url="https://bsky.app/profile/missharpylady.bsky.social/post/3lmofaq3y4s2d" author_name="Ms. HarpyLady" author_handle="missharpylady.bsky.social" posted_at="4/12/2025, 11:11:12 PM">
              <content>
                Something like encouraging a cadence of engagement behavior that’s not conducive to the degradation of a user’s life/ well-being? Is that in the same direction of your suggestion?
              </content>
              <reply_to uri="at://did:plc:4q35tibc2dwdefnxrspnvm65/app.bsky.feed.post/3lmnhe4ktac2e"></reply_to>
              Engagement: 1 likes, 0 reposts, 1 replies
              <replies>
                <post type="reply" uri="at://did:plc:4q35tibc2dwdefnxrspnvm65/app.bsky.feed.post/3lmpe4i4uak24" bsky_url="https://bsky.app/profile/techmag.bsky.social/post/3lmpe4i4uak24" author_name="Gary Hewett 🇨🇦" author_handle="techmag.bsky.social" posted_at="4/13/2025, 8:23:36 AM">
                  <content>
                    Well I like the idea of curation — a set of things that represent the expression of something bigger — come visit my zen garden for example

Now compare that to posting “here’s my zen garden” pics every 5 minutes

Right now the hyper-activity is being rewarded and there is no path for the curation
                  </content>
                  <reply_to uri="at://did:plc:yrduw3papswktykngj6ccpci/app.bsky.feed.post/3lmofaq3y4s2d"></reply_to>
                  Engagement: 1 likes, 0 reposts, 1 replies
                  <replies>
                    <post type="reply" uri="at://did:plc:4q35tibc2dwdefnxrspnvm65/app.bsky.feed.post/3lmpecxf2pk24" bsky_url="https://bsky.app/profile/techmag.bsky.social/post/3lmpecxf2pk24" author_name="Gary Hewett 🇨🇦" author_handle="techmag.bsky.social" posted_at="4/13/2025, 8:27:13 AM">
                      <content>
                        Or maybe we’re still just projecting what we think social media is “here” for all the “there”s we came from and we simply haven’t settled into what #BlueSky will become without the algorithmic and economic incentives driving it in the same directions? 🤔
                      </content>
                      <reply_to uri="at://did:plc:4q35tibc2dwdefnxrspnvm65/app.bsky.feed.post/3lmpe4i4uak24"></reply_to>
                      Engagement: 1 likes, 0 reposts, 0 replies
                    </post>
                  </replies>
                </post>
              </replies>
            </post>
          </replies>
        </post>
      </replies>
    </post>
    <post type="reply" uri="at://did:plc:4c4p2737rx44p2iwh6f3rasf/app.bsky.feed.post/3lmnqetqxu22z" bsky_url="https://bsky.app/profile/perfectdrift.bsky.social/post/3lmnqetqxu22z" author_name="perfectdrift.bsky.social" author_handle="perfectdrift.bsky.social" posted_at="4/12/2025, 4:57:47 PM">
      <content>
        📌
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
    </post>
    <post type="reply" uri="at://did:plc:2rksch7psuzxuyajs542twor/app.bsky.feed.post/3lmsr73rzek2v" bsky_url="https://bsky.app/profile/intellog.com/post/3lmsr73rzek2v" author_name="Intellog Inc." author_handle="intellog.com" posted_at="4/14/2025, 4:55:43 PM">
      <content>
        Interesting thread, Dan. Although we won&apos;t profess to understand all the nuances of your comments, what you say seems to make sense in broad terms. Hopefully, Bluesky is paying attention to your worthwhile recommendations. | 🦋 | 🧵 1/8
      </content>
      <reply_to uri="at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n"></reply_to>
      Engagement: 0 likes, 0 reposts, 1 replies
      <replies>
        <post type="reply" uri="at://did:plc:2rksch7psuzxuyajs542twor/app.bsky.feed.post/3lmsr73yhgc2v" bsky_url="https://bsky.app/profile/intellog.com/post/3lmsr73yhgc2v" author_name="Intellog Inc." author_handle="intellog.com" posted_at="4/14/2025, 4:55:43 PM">
          <content>
            That said, we&apos;ve found Bluesky feeds as they are currently constituted meet our admittedly modest requirements (see last post of thread for example). With one significant exception, however: the inability to optionally configure some sort of alert when something new appears in the feed. | 🦋 | 🧵 2/8
          </content>
          <reply_to uri="at://did:plc:2rksch7psuzxuyajs542twor/app.bsky.feed.post/3lmsr73rzek2v"></reply_to>
          Engagement: 0 likes, 0 reposts, 1 replies
          <replies>
            <post type="reply" uri="at://did:plc:2rksch7psuzxuyajs542twor/app.bsky.feed.post/3lmsr73yjes2v" bsky_url="https://bsky.app/profile/intellog.com/post/3lmsr73yjes2v" author_name="Intellog Inc." author_handle="intellog.com" posted_at="4/14/2025, 4:55:43 PM">
              <content>
                Checking any feed for new stuff has to be initiated manually one way or another. Regardless of how easy or convenient that is, it is still really just a matter of time before even this conscious act becomes too much trouble and/or gets forgotten and the feed falls off the mental table. | 🦋 | 🧵 3/8
              </content>
              <reply_to uri="at://did:plc:2rksch7psuzxuyajs542twor/app.bsky.feed.post/3lmsr73yhgc2v"></reply_to>
              Engagement: 0 likes, 0 reposts, 1 replies
              <replies>
                <post type="reply" uri="at://did:plc:2rksch7psuzxuyajs542twor/app.bsky.feed.post/3lmsr73yjet2v" bsky_url="https://bsky.app/profile/intellog.com/post/3lmsr73yjet2v" author_name="Intellog Inc." author_handle="intellog.com" posted_at="4/14/2025, 4:55:43 PM">
                  <content>
                    If we could configure an alert — similar to the one where we&apos;re tagged in a post, for example — that would be great. That would draw feed subscribers&apos; attention back to the feed when there&apos;s actually something new to see. | 🦋 | 🧵 4/8
                  </content>
                  <reply_to uri="at://did:plc:2rksch7psuzxuyajs542twor/app.bsky.feed.post/3lmsr73yjes2v"></reply_to>
                  Engagement: 0 likes, 0 reposts, 1 replies
                  <replies>
                    <post type="reply" uri="at://did:plc:2rksch7psuzxuyajs542twor/app.bsky.feed.post/3lmsr73yke32v" bsky_url="https://bsky.app/profile/intellog.com/post/3lmsr73yke32v" author_name="Intellog Inc." author_handle="intellog.com" posted_at="4/14/2025, 4:55:43 PM">
                      <content>
                        In effect, it enables the feed to be monitored passively rather than actively. If Bluesky can do just this one thing, we&apos;d be good for a while, at least. The last post in this thread has an example of one of the feeds we manage, BluFly. | 🦋 | 🧵 5/8
                      </content>
                      <reply_to uri="at://did:plc:2rksch7psuzxuyajs542twor/app.bsky.feed.post/3lmsr73yjet2v"></reply_to>
                      Engagement: 0 likes, 0 reposts, 1 replies
                      <replies>
                        <post type="reply" uri="at://did:plc:2rksch7psuzxuyajs542twor/app.bsky.feed.post/3lmsr73yke42v" bsky_url="https://bsky.app/profile/intellog.com/post/3lmsr73yke42v" author_name="Intellog Inc." author_handle="intellog.com" posted_at="4/14/2025, 4:55:43 PM">
                          <content>
                            We speak of it as being &apos;double curated&apos;: our curation is by identifying and vetting Trusted Contributors (TC). In turn, the TC&apos;s curate their posts by adding an &apos;Emojitag&apos; (specifically 🛩️ in BluFly’s case) to signal whether their post should be in the feed, or not. It&apos;s really simple. | 🦋 | 🧵 6/8
                          </content>
                          <reply_to uri="at://did:plc:2rksch7psuzxuyajs542twor/app.bsky.feed.post/3lmsr73yke32v"></reply_to>
                          Engagement: 0 likes, 0 reposts, 1 replies
                          <replies>
                            <post type="reply" uri="at://did:plc:2rksch7psuzxuyajs542twor/app.bsky.feed.post/3lmsr73ylde2v" bsky_url="https://bsky.app/profile/intellog.com/post/3lmsr73ylde2v" author_name="Intellog Inc." author_handle="intellog.com" posted_at="4/14/2025, 4:55:43 PM">
                              <content>
                                Moreover, rather than getting bogged down with ranking, we simply run with the default reverse chronological order — most recent post at the top. We assert the half-life of interest in *any* of our posts is, say, no more than a day or so. We suspect this is also the case more generally. | 🦋 | 🧵 7/8
                              </content>
                              <reply_to uri="at://did:plc:2rksch7psuzxuyajs542twor/app.bsky.feed.post/3lmsr73yke42v"></reply_to>
                              Engagement: 0 likes, 0 reposts, 1 replies
                              <replies>
                                <post type="reply" uri="at://did:plc:2rksch7psuzxuyajs542twor/app.bsky.feed.post/3lmsr73ymcm2v" bsky_url="https://bsky.app/profile/intellog.com/post/3lmsr73ymcm2v" author_name="Intellog Inc." author_handle="intellog.com" posted_at="4/14/2025, 4:55:43 PM">
                                  <content>
                                    This order, if nothing else, is clearly understood by all concerned. Here&apos;s that feed we mentioned above. While sadly still all but invisible in the Bluesky landscape, we&apos;re pleased with both the aesthetics and content and are going to be patient with it. Alerts would really help. | 🦋 | 🧵 8/8
                                  </content>
                                  <reply_to uri="at://did:plc:2rksch7psuzxuyajs542twor/app.bsky.feed.post/3lmsr73ylde2v"></reply_to>
                                  <embed type="link">
                                    Title: "The Humans-in-the-Loop Feed for the Aviation Community"
                                    URL: https://blufly.media/feed/?utm_source=intellog.com&utm_campaign=06024
                                    Description: "Featuring posts from our excellent Trusted Contributors 🛡️. If it&apos;s made by people and flying up to the Kármán Line, you&apos;ll find it here."
                                    Thumbnail: https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:2rksch7psuzxuyajs542twor/bafkreie2ca56guo3y6chd6upkqsbbom35bgnkwwis66uzrmmiqammaursa@jpeg
                                  </embed>
                                </post>
                              </replies>
                            </post>
                          </replies>
                        </post>
                      </replies>
                    </post>
                  </replies>
                </post>
              </replies>
            </post>
          </replies>
        </post>
      </replies>
    </post>
  </replies>
</post>
</posts>
```

## File: post_thread_2.json

### Thread:
```xml
<posts>
<post type="reply" uri="at://did:plc:sfmur4r4wzriaupbgmz7sshy/app.bsky.feed.post/3lmcunnp5l32j" bsky_url="https://bsky.app/profile/joshuashew.bsky.social/post/3lmcunnp5l32j" author_name="Joshua Shew" author_handle="joshuashew.bsky.social" posted_at="4/8/2025, 9:14:35 AM">
  <content>
    &quot;Am just better than other people&quot; is my edgy framing of the alternative that I hope is true—that examining moral questions with curiosity is valuable, and I am a better person than the me that neglected to engage in that work.
  </content>
  <reply_to uri="at://did:plc:sfmur4r4wzriaupbgmz7sshy/app.bsky.feed.post/3lmcunnp5l22j"></reply_to>
</post>
</posts>
```

