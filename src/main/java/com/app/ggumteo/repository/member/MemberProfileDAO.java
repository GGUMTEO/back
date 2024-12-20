package com.app.ggumteo.repository.member;

import com.app.ggumteo.domain.member.MemberProfileVO;
import com.app.ggumteo.domain.member.MemberVO;
import com.app.ggumteo.mapper.member.MemberMapper;
import com.app.ggumteo.mapper.member.MemberProfileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MemberProfileDAO {
    private final MemberProfileMapper memberProfileMapper;

    public void save(MemberProfileVO memberProfileVO) {memberProfileMapper.insert(memberProfileVO);}

    //  마이페이지 - 회원 정보 수정(조회)
    public Optional<MemberProfileVO> findByMemberId(Long memberId) {
        return memberProfileMapper.selectByMemberId(memberId);
    };

    // 마이페이지 - 내 정보 수정
    public void setMemberProfileByMemberId(MemberProfileVO memberProfileVO) {
        memberProfileMapper.updateMemberProfileByMemberId(memberProfileVO);
    }
}
