package com.app.ggumteo.controller.member;

import com.app.ggumteo.service.main.MainService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final MainService mainService;

    @GetMapping({"/", "/main"})
    public String mainPage(Model model) {
        int totalMembers = mainService.getTotalMembers();
        int totalWorks = mainService.getTotalWorks();
        int totalConvergePrice = mainService.getTotalConvergePrice();
        double averageConvergePricePercentage = mainService.getAverageConvergePricePercentage();

        // Converge Price를 억 단위로 변환 (예: 8143000000 -> 81억)
        double totalConvergePriceEok = totalConvergePrice / 100_000_000.0;
        String totalConvergePriceFormatted;

        if (totalConvergePriceEok >= 1) {
            // 억 단위로 포맷팅
            totalConvergePriceFormatted = String.format("%.0f억", totalConvergePriceEok);
        } else {
            // 원 단위로 포맷팅 (천 단위 구분자 추가)
            totalConvergePriceFormatted = String.format("%,d", totalConvergePrice);
        }

        // 평균 퍼센트 포맷 (소수점 2자리)
        String averageConvergePricePercentageFormatted = String.format("%.2f", averageConvergePricePercentage);

        model.addAttribute("totalMembers", totalMembers);
        model.addAttribute("totalWorks", totalWorks);
        model.addAttribute("totalConvergePrice", totalConvergePriceFormatted);
        model.addAttribute("averageConvergePricePercentage", averageConvergePricePercentageFormatted);

        return "main"; // main.html 템플릿 이름 (슬래시 없이)
    }

}
